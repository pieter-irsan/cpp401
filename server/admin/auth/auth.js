const jwt = require("jsonwebtoken");

function signToken(username, userType) {
    const token = jwt.sign({ username: username, usertype: userType }, process.env.JWT_SECRET);
    return token;
}

function verifyToken(token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return [decoded.username, decoded.usertype]
}

const verifyAdmin = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(403).redirect('/admin/auth/login.html');
    else {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (decoded.usertype == 'admin') next();
        } catch (err) {
            return res.status(401).redirect('/admin/auth/login.html');
        }
    }
};

const verifyUser = (req, res, next) => {
    const token = req.cookies.token
    if (!token) return res.status(403).redirect('/auth/login.html');
    else {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (decoded.usertype == 'user') next();
        } catch (err) {
            return res.status(401).redirect('/auth/login.html');
        }
    }
};

module.exports = {
    signToken,
    verifyToken,
    verifyAdmin,
    verifyUser
};
