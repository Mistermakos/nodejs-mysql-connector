import { databaseConnection } from "../../databaseConnection.js"

export const getAllPostsModel = async () => {
    const [rows, fields] = await databaseConnection.query("SELECT * FROM `Posts`;")
    return rows
}

export const getOnePostModel = async (id) => {
    const [rows, fields] = await databaseConnection.query("SELECT * FROM `Posts` WHERE `post_id` = ? ;",
        parseInt(id))
    return rows
}

export const addOnePostModel = async (title, description, creatorId) => {
    const response = await databaseConnection.query("INSERT INTO `Posts`(`title`, `description`, `author_id`) VALUES (?,?,?);",
        [String(title), String(description), parseInt(creatorId)])
    return response
}

export const updateOnePostModel = async (id, updatedPost) => {
    const response = await databaseConnection.query(
        `UPDATE Posts 
         SET title = ?, description = ?
         WHERE post_id = ?`,
        [
            updatedPost.title,
            updatedPost.description,
            id
        ]
    )
    return response
}

export const deleteOnePostModel = async (id) => {
    const response = await databaseConnection.query(
        "DELETE FROM `Posts` where post_id = ?", id)
    return response
}