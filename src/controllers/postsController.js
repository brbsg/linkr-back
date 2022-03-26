import urlMetadata from 'url-metadata';
import connection from '../database.js';

export async function getAllPosts(req, res) {
  try {
    const result = await connection.query(`
            SELECT posts.*, users.name, users.image 
                FROM posts 
            JOIN users 
                ON posts."userId" = users.id
            ORDER BY posts.id DESC LIMIT 20 ;
        `);

    for (let i in result.rows) {
      const promise = await urlMetadata(result.rows[i].link);

      result.rows[i].linkImage = promise.image;
      result.rows[i].linkTitle = promise.title;
      result.rows[i].linkDescription = promise.description;
    }

    res.send(result.rows);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function createPost(req, res) {
  const { link, text } = req.body;
  const userId = res.locals.userId;

  try {
    await connection.query(
      `
      INSERT INTO posts
      ("userId", link, text)
      VALUES
      ($1, $2, $3);
      `,
      [userId, link, text]
    );
    console.log(userId);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function deletePost(req, res) {}
