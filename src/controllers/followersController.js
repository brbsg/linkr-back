import connection from '../database.js';

export async function getFollowing(req, res) {
    const userId = res.locals.userId;
    console.log(userId)

    try {
        const result = await connection.query(`
        SELECT "followerId", "followedId", users.name
        FROM followers
        JOIN users ON "followedId"=users.id
        WHERE "followerId"=$1
        `, [userId])
        res.send(result.rows)
    } catch(error) {
        console.log(error);
        res.status(500).send(error);
    }
}