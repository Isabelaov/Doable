import SQLite, {
  SQLError,
  SQLiteDatabase,
  Transaction,
} from 'react-native-sqlite-storage';
import { HabitRepository } from '../../domain/repositories/habit.repository';

export class HabitRepositoryImp implements HabitRepository {
  private database: SQLiteDatabase;
  init = this.initDb();

  private async initDb() {
    try {
      this.database = await SQLite.openDatabase({
        name: 'habits_db',
        location: 'default',
      });

      this.database.transaction((tx: Transaction) => {
        tx.executeSql(`CREATE TABLE IF NOT EXISTS habits (
          id INTEGER PRIMARY KEY,
          name TEXT NOT NULL,
          description TEXT,
          frequency TEXT,
          reminderTime TEXT,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
          )`);
      });
    } catch (error) {
      console.error(error);
    }
  }

  async create(data: any) {
    return new Promise((resolve, reject) => {
      this.database.transaction((tx: Transaction) => {
        tx.executeSql(
          'INSERT INTO Habits (name, description, frequency, reminderTime) VALUES ( ?, ?, ?, ?)',
          [data.name, data.description, data.frequency, data.reminderTime],
          (_: Transaction) => {
            resolve({
              status: 201,
              data,
              message: 'Habit created successfully!',
            });
          },
          (_: Transaction, error: SQLError) => {
            reject(new Error(error.message));
            return false;
          },
        );
      });
    });
  }

  async edit(data: any) {
    console.log(data);
  }

  async getAll() {
    console.log('get all');
    return [];
  }

  async getOne(id: number) {
    console.log(id);
  }
}
