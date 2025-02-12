import {
  SQLError,
  SQLiteDatabase,
  Transaction,
} from 'react-native-sqlite-storage';
import { ProgressRepository } from '../../domain/repositories/progress.repository';
import { db } from '../../config/db.config';
import { ProgressReq } from '../../domain/request/progress.request';
import { Progress } from '../../domain/entities/progress.entity';

export class ProgressRepositoryImp implements ProgressRepository {
  private readonly database: SQLiteDatabase = db;

  constructor() {
    this.initTable();
  }

  private async initTable() {
    try {
      this.database.transaction((tx: Transaction) => {
        tx.executeSql(`CREATE TABLE IF NOT EXISTS progress (
          id INTEGER PRIMARY KEY,
          habit_id INTEGER NOT NULL,
          FOREIGN KEY (habit_id) REFERENCES habits(id) ON DELETE CASCADE,
          date DATETIME DEFAULT CURRENT_TIMESTAMP
          )`);
      });
    } catch (error: any) {
      console.error({ ...error });
    }
  }

  async create(data: ProgressReq): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.database.transaction((tx: Transaction) => {
        tx.executeSql(
          'INSERT INTO progress (habit_id) VALUES (?)',
          [data.habitId],
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
      this.database.transaction((tx: Transaction) => {
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
      this.database.transaction((tx: Transaction) => {
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
