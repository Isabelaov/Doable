import SQLite, { SQLiteDatabase } from 'react-native-sqlite-storage';

export const db: SQLiteDatabase = SQLite.openDatabase(
  {
    name: 'doable_db',
    location: 'default',
  },
  () => {
    db.executeSql('PRAGMA foreign_keys = ON;');
    console.log('db opened');
  },
  (err: any) => console.error('error opening db', { ...err }),
);
