import {
  SQLError,
  SQLiteDatabase,
  Transaction,
} from 'react-native-sqlite-storage';
import { ProgressRepository } from '../../domain/repositories/progress.repository';
import { ProgressReq } from '../../domain/request/progress.request';
import { Progress } from '../../domain/entities/progress.entity';
import { initDB } from '../../config/db.config';

export class ProgressRepositoryImp implements ProgressRepository {
  private database: SQLiteDatabase | undefined;

  async create(data: ProgressReq): Promise<void> {
    if (!this.database) {
      this.database = await initDB();
    }

    return new Promise<void>((resolve, reject) => {
      this.database!.transaction((tx: Transaction) => {
        tx.executeSql(
          'INSERT INTO progress (habit_id, date) VALUES (?, ?)',
          [data.habitId, String(new Date())],
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

  async getAll(): Promise<Progress[]> {
    return new Promise((resolve, reject) => {
      this.database!.transaction((tx: Transaction) => {
        tx.executeSql(
          'SELECT * FROM progress',
          [],
          (_: Transaction, { rows }: any) => {
            const progress: Progress[] = [];
            for (let i = 0; i < rows.length; i++) {
              progress.push(rows.item(i));
            }
            resolve(progress as []);
          },
          (_: Transaction, error: SQLError) => {
            reject(new Error(error.message));
            return false;
          },
        );
      });
    });
  }

  async getFromHabit(habitId: number): Promise<Progress[]> {
    return new Promise((resolve, reject) => {
      this.database!.transaction((tx: Transaction) => {
        tx.executeSql(
          'SELECT * FROM progress WHERE habit_id = (?)',
          [habitId],
          (_: Transaction, { rows }: any) => {
            const progress: Progress[] = [];
            for (let i = 0; i < rows.length; i++) {
              progress.push(rows.item(i));
            }
            resolve(progress as []);
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
