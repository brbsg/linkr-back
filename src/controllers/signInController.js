import connection from "../database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function signIn(req, res) {
  const { email, password } = req.body;

  try {
    const { rows: dbUser } = await connection.query(
      "SELECT * FROM users WHERE users.email=$1",
      [email]
    );

    if (!dbUser[0]) {
      return res.sendStatus(401);
    }

    const { rows: dbSession } = await connection.query(
      `SELECT * FROM sessions WHERE "userId"=$1`,
      [dbUser[0].id]
    );

    if (bcrypt.compareSync(password, dbUser[0].password)) {
      const token = jwt.sign({ name: dbUser.name }, process.env.JWT_SECRET, {
        expiresIn: 86400,
      });

      if (dbSession[0]) {
        await connection.query(
          'UPDATE sessions SET token=$1 WHERE "userId"=$2',
          [token, dbUser[0].id]
        );
      } else {
        await connection.query(
          'INSERT INTO sessions (token, "userId") VALUES ($1, $2)',
          [token, dbUser[0].id]
        );
      }

      return res.send(token);
    }

    res.sendStatus(401);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
