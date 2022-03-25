import connection from "../database";

export async function toggleLike(req, res) {
    const id = req.locals.id

    try {
        const user = await connection.query(`
            SELECT * FROM users
            WHERE id = $1
        `, [id])
        console.log(user.rows[0].image)
        res.send(user.rows[0].image)
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}
