import jwt from "jsonwebtoken"

export const createJWT = async (userId, login, role) => {
    const payload = {
        userId: userId,
        login: login,
        role: role
    }
    
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" })
    return token
}