import urlMetadata from "url-metadata";
import connection from "../database.js";

export async function postPublish(req, res) {
  const { link, text } = req.body;
  const userId = res.locals.userId;

  try {
    await connection.query(
      `
            INSERT INTO posts
                (userId, link, text)
            VALUES
                ($1, $2, $3);
        `,
      [userId, link, text]
    );
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function getAllPosts(req, res) {
  try {
    const result = await connection.query(`
            SELECT *.posts, users.name, users.image 
                FROM posts 
            JOIN users 
                ON posts.userId = users.id
            ORDER BY posts.id LIMIT 20;
        `);
    const posts = result.rows.map((post) => {
      const promise = urlMetadata(post.link);
      promise
        .then((metadata) => {
          post.linkImage = metadata.image;
          post.linkTitle = metadata.title;
          post.linkDescription = metadata.description;
        })
        .catch(() => {
          res.sendStatus(422);
        });
    });

    res.send(posts);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
