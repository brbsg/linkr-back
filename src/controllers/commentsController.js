import connection from '../database.js';

export async function postComment(req, res) {
    const { text, postId } = req.body;
    const userId = res.locals.userId;

 try { 
    await connection.query(`
    INSERT INTO comments
    (text, "postId", "userId")
    VALUES ($1, $2, $3)
    `, [text, postId, userId])
    res.sendStatus(200);
 } catch(error) {
     console.log(error);
     res.status(500).send(error);
 }
}

export async function getComments(req, res) {
    const { id } = req.params
    try {
        const result = await connection.query(`
        SELECT 
            comments.text, 
            users.name,
            users.image
        FROM comments
        JOIN users ON comments."userId"=users.id
        WHERE "postId"=$1
        `, [id])
    res.send(result.rows)
    } catch(error) {
        console.log(error);
        res.status(500).send(error);
    }
}