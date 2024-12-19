import { NextApiRequest, NextApiResponse } from "next";
import pool from "../../lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    try {
      // Query the database to validate the user
      const [rows] = await pool.query(
        "SELECT * FROM Users_login WHERE login = ? AND password = ?",
        [username, password]
      );

      // Assert that `rows` is an array of objects
      if (Array.isArray(rows) && rows.length > 0) {
        return res.status(200).json({ message: "Login successful!" });
      } else {
        return res.status(401).json({ message: "Invalid username or password." });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
