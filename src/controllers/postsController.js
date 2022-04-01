import urlMetadata from 'url-metadata';
import connection from '../database.js';

export async function getAllPosts(req, res) {
  const userId = res.locals.userId;
  try {
    const isFollowing = await connection.query(
      `SELECT * FROM followers f WHERE f."followerId" = $1`,
      [userId]
    );
    if (isFollowing.rowCount === 0) {
      const posts = 'No friends';
      return res.send(posts);
    }

    const result = await connection.query(
      `
      SELECT posts.*, a.name, a.image, reposts."userId" as "reposterId", b.name as "reposterName"
        FROM followers
          JOIN users a ON a.id = followers."followedId"
          JOIN posts ON followers."followedId" = posts."userId"
          LEFT JOIN reposts ON reposts."postId" = posts.id
          LEFT JOIN users b ON b.id=reposts."userId"
          
          WHERE followers."followerId" = $1
          ORDER BY posts.id DESC LIMIT 40;
      `,[userId]
    );

    for (let i in result.rows) {
      result.rows[i].delEditOption = false;
      if (userId === result.rows[i].userId) {
        result.rows[i].delEditOption = true;
      }
    }

    res.send(result.rows);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function createPost(req, res) {
  const { link, description, hashtags } = req.body;
  const userId = res.locals.userId;

  try {
    let linkImage;
    let linkTitle;
    let linkDescription;
    try {
      const promise = await urlMetadata(link);

      linkImage = promise.image;
      linkTitle = promise.title;
      linkDescription = promise.description;
    } catch (error) {
      linkImage =
        'https://pbs.twimg.com/profile_images/1605443902/error-avatar.jpg';
      linkTitle = 'invalid';
      linkDescription = 'invalid';
    }

    await connection.query(
      `
      INSERT INTO posts
      ("userId", link, description, "linkImage", "linkTitle", "linkDescription")
      VALUES
      ($1, $2, $3, $4, $5, $6);
      `,
      [userId, link, description, linkImage, linkTitle, linkDescription]
    );

    const post = await connection.query(
      `
      SELECT * FROM posts
      WHERE "userId"=$1
      ORDER BY id DESC
      LIMIT(1)
      `,
      [userId]
    );
    const postId = post.rows[0].id;

    hashtags.map(async (hashtag) => {
      let result = await connection.query(
        `
      SELECT * FROM hashtags
      WHERE name=$1
      `,
        [hashtag]
      );

      if (result.rowCount < 1) {
        await connection.query(
          `
          INSERT INTO hashtags
          (name)
          VALUES 
          ($1)
        `,
          [hashtag]
        );

        result = await connection.query(
          `
        SELECT * FROM hashtags
        WHERE name=$1
      `,
          [hashtag]
        );
      }

      const hashtagId = result.rows[0].id;
      await connection.query(
        `
      INSERT INTO "hashtagsPosts"
        ("postId", "hashtagId")
      VALUES
        ($1, $2)
      `,
        [postId, hashtagId]
      );
    });

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function rePost(req, res){
  const {postId} = req.params;
  const {userId} = res.locals;
  console.log(postId);
  console.log(userId);

  try {
    // const result = await connection.query(`
    //   SELECT posts.*, "hashtagsPosts"."hashtagId"
    //     FROM "hashtagsPosts"
    //   RIGHT JOIN posts
    //     ON  posts.id = "hashtagsPosts"."postId"
    //   WHERE "hashtagsPosts"."postId" = $1;
    // `, [postId]);

    const result = await connection.query(`
      SELECT * FROM posts WHERE posts.id = $1;
    `, [postId])

    console.log(result.rows[0]);

    await connection.query(`
      INSERT INTO posts
        ("userId", link, description, "linkImage", "linkTitle", "linkDescription")
      VALUES
        ($1, $2, $3, $4, $5, $6);
    `, [
      result.rows[0].userId, 
      result.rows[0].link, 
      result.rows[0].description, 
      result.rows[0].linkImage, 
      result.rows[0].linkTitle, 
      result.rows[0].linkDescription
    ]);

    const repost = await connection.query(`
      SELECT * FROM posts
      WHERE posts."userId" = $1
      ORDER BY posts.id DESC
      LIMIT 1;
    `, [result.rows[0].userId]);

    // const reREpost = await connection.query(`
    // SELECT reposts.*, "postB".id AS "newPostId"
    //   FROM reposts
    // JOIN posts "postA"
    //   ON "postA".id = reposts."postId"
    // JOIN posts "postB"
    //  ON "postB"."userId" = "postA"."userId"
    // WHERE reposts."postId" = $1 
    // ORDER BY "newPostId" DESC
    // LIMIT 1;
    // `, [postId]);

    console.log(repost.rows);

    await connection.query(`
      INSERT INTO reposts
        ("userId", "postId")
      VALUES 
        ($1, $2);
    `, [userId, repost.rows[0].id]);

    const hashtags = await connection.query(`
      SELECT * FROM "hashtagsPosts" 
      WHERE "hashtagsPosts"."postId" = $1;
    `, [postId]);

    if(hashtags){
      hashtags.rows.map( async (post) => {
        await connection.query(
          `
        INSERT INTO "hashtagsPosts"
          ("postId", "hashtagId")
        VALUES
          ($1, $2)
        `,
          [repost.rows[0].id, post.hashtagId]
        );
      })
    }

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function deletePost(req, res) {
  const { id } = req.params;

  try {
    await connection.query('DELETE FROM "hashtagsPosts" WHERE "postId"=$1', [
      id,
    ]);
    await connection.query('DELETE FROM likes WHERE "postId"=$1', [id]);
    await connection.query('DELETE FROM posts WHERE id=$1', [id]);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function editPost(req, res) {
  const { id } = req.params;
  const { newText } = req.body;

  try {
    const result = await connection.query(
      'UPDATE posts SET description=$1 WHERE id=$2',
      [newText, id]
    );
    if (result.rowCount === 0) {
      res.sendStatus(404);
      return;
    }
    res.sendStatus(200);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(500);
  }
}

export async function getPostsByHashtag(req, res) {
  const { hashtag } = req.params;

  try {
    const result = await connection.query(
      `
      SELECT hashtags.*, posts.id AS "postId", posts."userId", posts.link, posts.text, users.name, users.image
        FROM hashtags
          JOIN "hashtagsPosts"
            ON hashtags.id = "hashtagsPosts"."hashtagId"
              JOIN posts
                ON posts.id = "hashtagsPosts"."postId"
                  JOIN users
                    ON users.id = posts."userId"
      WHERE hashtags.name=$1
    `,
      [hashtag]
    );

    if (result.rowCount === 0) {
      return res.sendStatus(404);
    }

    const [posts] = result.rows;
    res.send(posts);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(500);
  }
}

export async function newPostsAlert(req, res) {
  const userId = res.locals.userId;

  try {
    const result = await connection.query(
      `SELECT COUNT(posts.*)
        FROM followers
          JOIN users a ON a.id = followers."followedId"
          JOIN posts ON followers."followedId" = posts."userId"
          LEFT JOIN reposts ON reposts."postId" = posts.id
          LEFT JOIN users b ON b.id=reposts."userId"
          WHERE followers."followerId" = $1`,
      [userId]
    );
    console.log(result.rows[0]);
    res.send(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
