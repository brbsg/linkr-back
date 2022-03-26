import connection from '../database.js';

export async function toggleLike(req, res) {
  const { postId } = req.body;
  const userId = res.locals.userId

  try {
    const result = await connection.query(
      `
        SELECT * FROM likes
            WHERE "postId" = $1 AND "userId" = $2
        `,
      [postId, userId]
    );

    if (result.rowCount !== 0) {
      await connection.query(
        `
                DELETE FROM likes
                WHERE "postId" = $1 AND "userId" = $2
        `,
        [postId, userId]
      );
    } else {
      await connection.query(
        `
            INSERT INTO likes
                ("postId", "userId")
            VALUES ($1, $2)
            `,
        [postId, userId]
      );
    }

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

export async function getLikes(req, res) {
  const { postId } = req.body;

  try {
    const result = await connection.query(
      `
        SELECT
            users.name AS user
        FROM users
        JOIN likes ON likes."userId" = users.id
        WHERE likes."postId" = $1
        `,
      [postId]
    );

    const users = result.rows
    const count = result.rowCount;
    res.send({ users, count })
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
