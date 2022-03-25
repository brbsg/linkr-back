import connection from "../database";

export async function getHashtags(req, res){
  try {
    const result = await connection.query(`
      SELECT * FROM hashtags LIMIT 10;
    `);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}