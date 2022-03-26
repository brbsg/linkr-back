import connection from "../database.js";

export async function getUser(req, res) {
    const userId = res.locals.userId;

    try {
        const user = await connection.query(`
            SELECT image FROM users
            WHERE id = $1
        `, [userId])
        res.send(user.rows[0].image)
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}
