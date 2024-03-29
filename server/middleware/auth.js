const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        if(req.originalUrl === "/movies/fetch"){
            next();
        } else {
            const token = req.header('Authorization');
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded.user;
            next();
        }
    } catch (e) {
        res.status(401).json({message: 'unauthorized'});
    }
};