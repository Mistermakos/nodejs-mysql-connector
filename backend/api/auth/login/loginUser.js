import bcrypt from "bcrypt"
import { databaseConnection } from "../../../databaseConnection.js"

export const loginUser = async (login, password) => {
    const [rows] = await databaseConnection.query(
        "SELECT user_id, login, role, password FROM Users WHERE login = ?",
        [login]
    )
    if (rows.length === 0) {
        const err = new Error("User not found")
        err.status = 400
        throw err
    }
    const user = rows[0]
    const validPassword = await bcrypt.compare(
        password,
        user.password
    )
    if (!validPassword) {
        const err = new Error("Invalid password")
        err.status = 400
        throw err
    }
    return [user.user_id, user.login, user.role]
}