import SQLite, { Transaction } from 'react-native-sqlite-storage';

export function initDB() {
  return new Promise<SQLite.SQLiteDatabase>((resolve, reject) => {
    const db = SQLite.openDatabase(
      {
        name: 'doable_db',
        location: 'default',
      },
      () => {
        db.executeSql(
          'PRAGMA foreign_keys = ON;',
          [],
          () => console.log('Foreign keys enabled'),
          (_, error) => {
            console.error(error);
          },
        );

        db.transaction((tx: Transaction) => {
          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS habits (
                  id INTEGER PRIMARY KEY,
                  name TEXT NOT NULL,
                  description TEXT,
                  frequency TEXT NOT NULL,
                  reminder_time TEXT NOT NULL,
                  created_at TEXT NOT NULL
                  )`,
            [],
            () => console.log('Habits table created'),
            (_, error) => {
              console.error('Error creating habits table', error.message);
              return false;
            },
          );

          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS progress (
              id INTEGER PRIMARY KEY,
              habit_id INTEGER NOT NULL,
              date TEXT NOT NULL,
              FOREIGN KEY (habit_id) REFERENCES habits(id) ON DELETE CASCADE
            )`,
            [],
            () => {
              console.log('Progress table created');
              resolve(db);
            },
            (_, error) => {
              console.error('Error creating progress table', error.message);
              return false;
            },
          );
        });
      },
      (err: any) => {
        console.error('error opening db', { ...err });
        reject(err);
      },
    );
  });
}
