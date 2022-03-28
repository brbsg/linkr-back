import connection from '../database.js';

export function getPostsByHashtag(req, res) {
    const { hashtag } = req.params;

    try {

    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
} 