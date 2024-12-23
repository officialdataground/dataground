import mysql from 'mysql2/promise';
declare namespace NodeJS {
  interface ProcessEnv {
    DB_HOST: string;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_NAME: string;
  }
}

const connectToDatabase = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    console.log('Connected successfully!');
    await connection.end();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Connection failed:', error.message);
    } else {
      console.error('An unknown error occurred');
    }
  }
};

connectToDatabase();
