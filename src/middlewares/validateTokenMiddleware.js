import Jwt from "jsonwebtoken";
export async function validateTokenMiddleware(req, res, next) {
    const {authorization} = req.headers;
    const token = authorization?.replace("Bearer ", "");

    if (!token) {
        return res.sendStatus(401);
    }

    try {
        //Jwt key contains {userId: xxx, name: xxx};
        const userData = Jwt.verify(token, process.env.JWT_SECRET);
        const userId = userData.userId;
        res.locals.userId = userId;
        next();
    } catch {
        res.sendStatus(401);
    }
}