import jwt from "jsonwebtoken"
import { secretData } from "../../../utils/secret.js"

export const createJWT = async (userId, login, role) => {
    const secret = secretData
    const payload = {
        userId: userId,
        login: login,
        role: role
    }
    const token = jwt.sign(payload, secret, { expiresIn: "1h" })
    return token
}