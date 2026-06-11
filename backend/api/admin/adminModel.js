import { databaseConnection } from "../../databaseConnection.js"

export const getAllAdminsModel = async () => {
    const [rows, fields] = await databaseConnection.query("SELECT `user_id`, `login`, `role` FROM `Users` WHERE `role` = 'admin';")
    return rows
}