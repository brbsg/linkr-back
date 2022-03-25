import connection from "../database";

export async function toggleLike(req, res) {
    const {postId, userId} = req.body;
    console.log(postId)
    console.log(userId)

    try {
        await connection.query(`
        INSERT INTO likes
            ("postId", "userId")
        VALUES ($1, $2)
        `, [postId, userId])
    res.sendStatus(200)
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

export async function getLikes(req, res) {
    const { postId } = req.params;
    console.log(postId)

    try {
        await connection.query(`
        SELECT
            users.name AS users
            "postId"
        FROM likes
        JOIN users ON users.id = likes."userId"
        WHERE postId = $1
        `, [postId]
        )
    } catch(error) {
        console.log(error);
        res.status(500).send(error);
    }
}