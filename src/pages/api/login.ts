import { NextApiRequest, NextApiResponse } from "next";
import pool from "../../lib/db";
import { FieldPacket, RowDataPacket } from "mysql2";
interface User extends RowDataPacket {
  id: number;
  username: string;
  password: string;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    try {
      // Query the database for the user
<<<<<<< HEAD
      const [rows]: any = await pool.query(
=======
      const [rows]: [User[], FieldPacket[]] = await pool.query<User[]>(
>>>>>>> d07351a0bc0133161fbce4fc5c2d4f8dd1ea4236
        "SELECT * FROM logindata.users WHERE username = ? AND password = ?",
        [username, password]
      );

      // Check if a matching user exists
      if (rows.length > 0) {
        return res.status(200).json({ message: "Login successful!" });
      } else {
        return res
          .status(401)
          .json({ message: "Invalid username or password." });
      }
    } catch (error) {
      console.error("Database error:", error);
      return res.status(500).json({ message: "Internal server error." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
