const jwt = require("jsonwebtoken");

exports.requireSignIn = (req, res, next) => {
    const token = req.headers.authorization;
    try {
        if (token) {
            const decoded = jwt.verify(token, process.env.secret)
            if (decoded) {
                const userID = decoded.userID;
                req.body.userID = userID;
                next();
            } else {
                res.send("Please login first")
            }
        }
    } catch (error) {
        return res.send({ message: "Please login first" });
    }
};


exports.adminValidate = async (req, res, next) => {
    const token = req.headers.authorization;
    try {
        if (token) {
            const decoded = jwt.verify(token, process.env.secret)
            if (decoded) {
                const userID = decoded.userID;
                req.body.userID = userID;
                next();
            } else {
                res.send("Please login first")
            }
        }
    } catch (error) {
        return res.send({ message: "Please login first" });
    }
};