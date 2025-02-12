import {
  SQLError,
  SQLiteDatabase,
  Transaction,
} from 'react-native-sqlite-storage';
import { HabitRepository } from '../../domain/repositories/habit.repository';
import { Habit } from '../../domain/entities/habit.entity';
import { HabitReq } from '../../domain/request/habit.request';
import { db } from '../../config/db.config';

export class HabitRepositoryImp implements HabitRepository {
  private readonly database: SQLiteDatabase = db;

  constructor() {
    this.initTable();
  }

  private async initTable() {
    try {
      this.database.transaction((tx: Transaction) => {
        tx.executeSql(`CREATE TABLE IF NOT EXISTS habits (
          id INTEGER PRIMARY KEY,
          name TEXT NOT NULL,
          description TEXT,
          frequency TEXT NOT NULL,
          reminderTime TEXT NOT NULL,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
          )`);
      });
    } catch (error: any) {
      console.error({ ...error });
    }
  }

  async create(data: HabitReq) {
    return new Promise<void>((resolve, reject) => {
      this.database.transaction((tx: Transaction) => {
        tx.executeSql(
          'INSERT INTO Habits (name, description, frequency, reminderTime) VALUES ( ?, ?, ?, ?)',
          [data.name, data.description, data.frequency, data.reminderTime],
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
      this.database.transaction((tx: Transaction) => {
        tx.executeSql(
          'UPDATE Habits SET name = ?, description = ?, frequency = ?, reminderTime = ? WHERE id = ?',
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
    return new Promise<Habit[]>((resolve, reject) => {
      this.database.transaction((tx: Transaction) => {
        tx.executeSql(
          'SELECT * FROM habits',
          [],
          (_: Transaction, { rows }: any) => {
            const habits: Habit[] = [];
            for (let i = 0; i < rows.length; i++) {
              habits.push(rows.item(i));
            }
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
      this.database.transaction((tx: Transaction) => {
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
}
