import connection from '../database.js';

export function getPostsByHashtag(req, res) {
    const { hashtag } = req.params;

    try {
        const result = connection.query(`
        SELECT "postsId", hashtags.name AS hashtags
        FROM hashtagsPosts
        JOIN hashtags on hashtagsPosts."hashtagId"=hashtags.id
        WHERE hashtags.name=$1
        `, [hashtag])

        res.send(result.rows)

    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
} 