import connection from "../server";

export async function postPublish(req, res) {
    const {link, text} = req.body;
    const {authorization} = req.headers;
    const token = authorization?.replace("Bearer ", "");

    try {
        const result = await connection.query(`
            SELECT * FROM sessions WHERE token = $1;
        `, [token]);
        const userId = result[0].userId;

        await connection.query(`
            INSERT INTO posts
                (userId, link, text)
            VALUES
                ($1, $2, $3);
        `, [userId, link, text]);
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(error);
    }
};