import { databaseConnection } from "../../databaseConnection.js"

export const getAllUsersModel = async () => {
    const [rows, fields] = await databaseConnection.query("SELECT `user_id`, `login`, `role` FROM `Users`;")
    return rows
}

export const getOneUserModel = async (id) => {
    const [rows, fields] = await databaseConnection.query("SELECT `user_id`, `login`, `role` FROM `Users` WHERE `user_id` = ? ;",
        parseInt(id))
    return rows
}

export const addOneUserModel = async (login, password, role) => {
    const response = await databaseConnection.query("INSERT INTO `Users`(`login`, `password`, `role`) VALUES (?,?,?);",
        [login, password, role])
    return response
}

export const updateOneUserModel = async (id, login, password)=> {
    const response = await databaseConnection.query(
        "UPDATE Users SET login = ?, password = ? WHERE user_id = ?",
        [
            login,
            password,
            id
        ]
    )
    return response
}

export const deleteOneUserModel = async (id) => {
    const response = await databaseConnection.query(
        "DELETE FROM `Users` where user_id = ?", id)
    return response
}