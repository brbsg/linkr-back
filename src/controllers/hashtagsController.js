import connection from '../database.js';

export async function getPostsByHashtag(req, res) {
  const { hashtag } = req.params;
  const userId = res.locals.userId;

  try {
    const result = await connection.query(`
    SELECT 
    "hashtagsPosts"."postId" AS "postId",
    hashtags.name AS hashtag,
    posts.*, 
    users.name, 
    users.image
    FROM "hashtagsPosts"
  JOIN hashtags
    ON "hashtagsPosts"."hashtagId"=hashtags.id
  JOIN posts
    ON "hashtagsPosts"."postId"=posts.id
  JOIN users  
    ON posts."userId" = users.id
  WHERE hashtags.name='turnip' 
  ORDER BY posts.id DESC
    `);

    for (let i in result.rows) {
      try {
        const promise = await urlMetadata(result.rows[i].link);

        result.rows[i].delEditOption = false;
        if (userId === result.rows[i].userId) {
          result.rows[i].delEditOption = true;
        }

        result.rows[i].linkImage = promise.image;
        result.rows[i].linkTitle = promise.title;
        result.rows[i].linkDescription = promise.description;
      } catch {
        result.rows[i].delEditOption = false;
        if (userId === result.rows[i].userId) {
          result.rows[i].delEditOption = true;
        }
        result.rows[i].linkImage =
          'https://pbs.twimg.com/profile_images/1605443902/error-avatar.jpg';
        result.rows[i].linkTitle = 'invalid';
        result.rows[i].linkDescription = 'invalid';
      }
    }

    res.send(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
