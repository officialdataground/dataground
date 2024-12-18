import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../lib/db'; // Make sure this file manages your database connection properly

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      // Fetch all users from the database
      const [rows] = await db.query('SELECT * FROM users');
      
      // Ensure rows is an array
      res.status(200).json(Array.isArray(rows) ? rows : []);
    } else if (req.method === 'POST') {
      const { username, password } = req.body;

      // Validate the input
      if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
      }

      // Insert a new user into the database
      await db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);

      res.status(201).json({ message: 'User created successfully' });
    } else {
      // Handle unsupported methods
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }
  } catch (error: any) {
    console.error('Error:', error);

    // Handle database errors
    if (error.code === 'ER_NO_SUCH_TABLE') {
      return res.status(500).json({ message: 'Database table does not exist' });
    }

    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}
