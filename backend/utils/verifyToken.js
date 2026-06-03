import jwt from "jsonwebtoken"

export const verifyJWT = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET)
}

export const verifyToken = async (req, res, next) => {
    const header = req.headers.authorization

    //negation of if exists with bearer at front
    if (!header?.startsWith("Bearer ")) {
        const error = new Error("Missing token")
        error.status = 401
        return next(error)
    }

    try {
        const token = header.split(" ")[1] // at 0 is bearer
        const payload = verifyJWT(token)
        req.user = payload // id, login, role
        next()
    } catch {
        const error = new Error("Invalid or expired token")
        error.status = 401
        return next(error)
    }
}