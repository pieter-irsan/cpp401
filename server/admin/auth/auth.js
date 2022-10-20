const jwt = require("jsonwebtoken");

function signToken(username) {
    const token = jwt.sign({ username: username }, process.env.JWT_SECRET)
    return token    
}

const verifyToken = (req, res, next) => {
    console.log(req.cookies)
    const token = req.cookies.token
    if (!token) return res.status(403).redirect('/admin/auth/login.html');
    else {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log(`decoded: ${JSON.stringify(decoded)}`)
        } catch (err) {
            return res.status(401).redirect('/admin/auth/login.html')
        }
        next();
    }
};

module.exports = {
    signToken,
    verifyToken
};
