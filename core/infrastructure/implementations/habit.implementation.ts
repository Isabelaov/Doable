import {
  SQLError,
  SQLiteDatabase,
  Transaction,
} from 'react-native-sqlite-storage';
import { HabitRepository } from '../../domain/repositories/habit.repository';
import { Habit } from '../../domain/entities/habit.entity';
import { HabitReq } from '../../domain/request/habit.request';
import SQLite from 'react-native-sqlite-storage';
import { initDB } from '../../config/db.config';

export class HabitRepositoryImp implements HabitRepository {
  private database: SQLiteDatabase | undefined;

  async create(data: HabitReq) {
    return new Promise<void>((resolve, reject) => {
      this.database!.transaction((tx: Transaction) => {
        tx.executeSql(
          'INSERT INTO habits (name, description, frequency, reminder_time, created_at) VALUES ( ?, ?, ?, ?, ?)',
          [
            data.name,
            data.description,
            data.frequency,
            data.reminderTime,
            String(new Date()),
          ],
          (_: Transaction) => {
            resolve();
          },
          (_: Transaction, error: SQLError) => {
            reject(new Error(error.message));
            return false;
          },
        );
      });
    });
  }

  async edit(data: HabitReq, id: number) {
    return new Promise<void>((resolve, reject) => {
      this.database!.transaction((tx: Transaction) => {
        tx.executeSql(
          'UPDATE habits SET name = ?, description = ?, frequency = ?, reminder_time = ? WHERE id = ?;',
          [data.name, data.description, data.frequency, data.reminderTime, id],
          (_: Transaction, resultSet) => {
            if (resultSet.rowsAffected > 0) {
              resolve();
            } else {
              reject(new Error('No habit found with the given ID'));
            }
          },
          (_: Transaction, error: SQLError) => {
            reject(new Error(error.message));
            return false;
          },
        );
      });
    });
  }

  async getAll() {
    if (!this.database) {
      this.database = await initDB();
    }

    return new Promise<Habit[]>((resolve, reject) => {
      this.database!.transaction((tx: Transaction) => {
        tx.executeSql(
          `
           SELECT 
              habits.*,
              progress.date,
              progress.id AS progress_id
            FROM 
              habits 
            LEFT JOIN 
              progress 
            ON 
            habits.id = progress.habit_id;
          `,
          [],
          (_: Transaction, { rows }: any) => {
            const habitsMap: Record<number, any> = {};
            for (let i = 0; i < rows.length; i++) {
              const row = rows.item(i);

              if (!habitsMap[row.id]) {
                habitsMap[row.id] = {
                  id: row.id,
                  name: row.name,
                  description: row.description,
                  frequency: row.frequency,
                  reminderTime: row.reminder_time,
                  progress: [],
                };
              }

              if (row.progress_id) {
                habitsMap[row.id].progress.push({
                  id: row.progress_id,
                  date: row.date,
                });
              }
            }

            const habits = Object.values(habitsMap);

            resolve(habits as []);
          },
          (_: Transaction, error: SQLError) => {
            reject(new Error(error.message));
            return false;
          },
        );
      });
    });
  }

  async getOne(id: number) {
    console.log(id);
  }

  async delete(id: number) {
    return new Promise<string>((resolve, reject) => {
      this.database?.transaction((tx: Transaction) => {
        tx.executeSql(
          'DELETE FROM progress WHERE progress.habit_id = ?',
          [id],
          (_: Transaction, resultSet) => {
            if (resultSet.rowsAffected) {
              console.log('Progress deleted');
            } else {
              console.log('No progress found with habit id', id);
            }
          },
          (_: Transaction, error: SQLError) => {
            reject(new Error(error.message));
            return false;
          },
        );

        tx.executeSql(
          'DELETE FROM habits WHERE id = ?',
          [id],
          (_: Transaction, resultSet) => {
            if (resultSet.rowsAffected > 0) {
              resolve('Habit deleted');
            } else {
              reject(new Error('No habit found with the given ID'));
            }
          },
          (_: Transaction, error: SQLError) => {
            reject(new Error(error.message));
            return false;
          },
        );
      });
    });
  }

  async deleteDB() {
    await this.database?.close();

    await new Promise<void>((res, rej) => {
      SQLite.deleteDatabase(
        { name: 'doable_db', location: 'default' },
        () => {
          this.database = undefined;
          console.log('Database deleted successfully');
          res();
        },
        err => {
          console.error('Error while deleting database', err);
          rej(err);
        },
      );
    });
  }
}
