const verifyToken = async (req, res, next) => {
    const token = req.headers['authorization']

    jwt.verify(token.split(' ')[1], process.env.secretKey, (err, decoded) => {
        if (err) {
            return res.json({ status: "JSON token invalid", status_code: "500" })
        } else {
            return {
                role: decoded.role,
                user_id: decoded.user_id,
                username: decoded.username,
            }
        }
    });
}


export default verifyToken;