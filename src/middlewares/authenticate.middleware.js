import jwt from 'jsonwebtoken';
import 'dotenv/config';
export function authenticateToken(req, res, next) {
    // get token from headers
    const authHeader = req.headers['authorization'];
    //Bearer
    const token = authHeader && authHeader.split(' ')[1];

    if (token === null) return res.sendStatus(401);

    jwt.verify(token,process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        console.log('user', user);
        req.user = user;
        next();
    });
}