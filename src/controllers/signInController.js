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
      const token = jwt.sign(
        { userId: dbUser[0].id, name: dbUser[0].name },
        process.env.JWT_SECRET,
        {
          expiresIn: 86400,
        }
      );

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

      const user = {
        id: dbUser[0].id,
        name: dbUser[0].name,
        image: dbUser[0].image,

      }

      return res.send({token: token, user: user});
    }

    res.sendStatus(401);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
