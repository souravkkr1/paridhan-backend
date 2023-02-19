const jwt = require("jsonwebtoken");

// import jwt from "jsonwebtoken"
require("dotenv").config();

exports.requireSignIn = (req, res, next) => {
    const token = req.headers.authorization;
    console.log("ramu:", token)
    console.log("secret:", process.env.secret)
    try {
        if (token) {
            console.log("ttttt:", token)
            const decoded = jwt.verify(token, process.env.secret)
            if (decoded) {
                const userID = decoded.userID;
                req.body.userID = userID;
                console.log(userID)
                next();
            } else {
                console.log("abcd")
                res.send("Please loginss first")
            }
            console.log("dede:", decoded)

        }
    } catch (error) {
        return res.json({ message: "Please login first" });
    }
};


// exports.requireSignIn = (req, res, next) => {
//     try {
//         const token = req.headers.authorization;
//         console.log("token:", token)
//         const user = jwt.verify(token, process.env.secret);
//         console.log("user:", user)
//         req.user = user;
//         next();
//     } catch (error) {
//         return res.send({ message: "Please login first" });
//     }
// };

// exports.adminValidate = async (req, res, next) => {
//     const token = req.headers.authorization;
//     try {
//         if (token) {
//             const decoded = jwt.verify(token, process.env.secret)
//             if (decoded) {
//                 const userID = decoded.userID;
//                 req.body.userID = userID;
//                 next();
//             } else {
//                 res.send("Please login first")
//             }
//         }
//     } catch (error) {
//         return res.send({ "message": "Please login first" });
//     }
// };