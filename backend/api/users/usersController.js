import bcrypt from "bcrypt"
import { asyncHandler } from "../../utils/asynchandler.js"
import { getAllUsersView, getOneUserView, addOneUserView, updateOneUserView, deleteOneUserView } from "./usersView.js"
import { createJWT } from "../auth/login/createJWT.js"
import { userExists } from "../auth/register.js"

const userNotFoundChecker = (dbResponse) => {
    if (!dbResponse) {
        const err = new Error("User not found")
        err.status = 404
        throw err
    }
    return
}

export const getAllUsersController = asyncHandler(async (req, res) => {
    const response = await getAllUsersView()
    res.status(200).json({
        contentLength: response.length,
        data: response
    })
})

export const getOneUserController = asyncHandler(async (req, res) => {
    let id = req.params.id
    const row = (await getOneUserView(id))[0]
    await userNotFoundChecker(row)
    res.status(200).json({
        data: row
    })
})

export const addOneUserController = asyncHandler(async (req, res) => {
    const creatorId = req.user.userId
    const { login, password, role } = req.body
    const creatorRole = (await getOneUserView(creatorId))[0].role
    if (creatorRole !== "admin") {
        return res.status(403).json({
            message: "You don't have access to create users"
        })
    } if (!login || !password) {
        return res.status(400).json({
            message: "Missing parameter (login or password)"
        })
    } if (!["admin", "user"].includes(role)) {
        return res.status(400).json({
            message: "Invalid parameter for role (admin or user only)"
        })
    }
    await userExists(login)
    const hashedPassword = await bcrypt.hash(password, 10)
    await addOneUserView(login, hashedPassword, role)
    return res.status(200).json({
        data: { message: "Data added successfully" }
    })
})

export const updateOneUserController = asyncHandler(async (req, res) => {
    const { id } = req.params
    const row = (await getOneUserView(id))[0]
    await userNotFoundChecker(row)
    if (req.user.userId != row.user_id) {
        const err = new Error("You are not the User")
        err.status = 403
        throw err
    }
    const hashedPassword = req.body.password ? await bcrypt.hash(req.body.password, 10) : row.password
    const login = req.body.login ?? row.login
    await userExists(login)
    const response = await updateOneUserView(id, login, hashedPassword)
    let token = await createJWT(row.user_id, login, row.role)

    return res.status(200).json({
        message: "User updated with the following data + your new token",
        data: {
            user_id: row.user_id,
            login: login,
            role: row.role
        },
        token: token
    })
})

export const deleteOneUserController = asyncHandler(async (req, res) => {
    let id = req.params.id
    const row = (await getOneUserView(id))[0]
    await userNotFoundChecker(row)
    if (req.user.userId != row.user_id && req.user.role != "admin") {
        const err = new Error("You are not the User/Allowed")
        err.status = 403
        throw err
    }
    const response = await deleteOneUserView(id)
    res.status(200).json({
        data: { message: "Data deleted successfully" }
    })
})