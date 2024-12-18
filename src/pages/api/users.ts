import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      // Fetch users from the database
      const [rows] = await db.query('SELECT * FROM users');
      res.status(200).json(rows);
    } else if (req.method === 'POST') {
      // Insert a new user
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
      }

      await db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);
      res.status(201).json({ message: 'User created successfully' });
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
