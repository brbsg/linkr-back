import connection from '../database.js';

export async function toggleLike(req, res) {
  const { postId } = req.body;
  const userId = res.locals.userId
  console.log(userId);

  try {
    const result = await connection.query(
      `
        SELECT * FROM likes
            WHERE "postId" = $1 AND "userId" = $2
        `,
      [postId, userId]
    );

    console.log(result.rows);
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
  const { postId } = req.params;
  console.log(postId);
  //retornar 2 likes mais recentes
  //retornar count de likes no post

  try {
    await connection.query(
      `
        SELECT
            users.name AS users
            "postId"
        FROM likes
        JOIN users ON users.id = likes."userId"
        WHERE postId = $1
        `,
      [postId]
    );
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
