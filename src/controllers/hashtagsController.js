import connection from '../database.js';

export async function getPostsByHashtag(req, res) {
  const { hashtag } = req.params;
  const { userId } = res.locals;

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
  WHERE hashtags.name=$1 
  ORDER BY posts.id DESC
    `, [hashtag]);

    for (let i in result.rows) {
      result.rows[i].delEditOption = false;
      if (userId === result.rows[i].userId) {
        result.rows[i].delEditOption = true;
      }
    }

    res.send(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
