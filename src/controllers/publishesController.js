import connection from "../server.js";

export async function postPublish(req, res) {
    const {link, text} = req.body;
    const userId = res.locals.userId;

    try {
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