import connection from "../database.js";

export async function getHashtags(req, res){
  try {
    const result = await connection.query(`
      SELECT hashtags.*, count("hashtagsPosts".id) AS "postsNumber"
      JOIN "hashtagsPosts" 
        ON "hashtagsPosts"."hashtagId" = hashtags.id
      GROUP BY hashtags.id
      ORDER BY "postsNumber" DESC
      LIMIT 10;
    `);
    res.send(result.rows);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}