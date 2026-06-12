import { getAllAdminsView, promoteUserView } from "./adminView.js"
import { asyncHandler } from "../../utils/asynchandler.js"
import { getOneUserView } from "../users/usersView.js"

export const getAllAdminsController = asyncHandler(async (req, res) => {
    const creatorId = req.user.userId
    const creatorRole = (await getOneUserView(creatorId))[0].role
    if (creatorRole !== "admin") {
        return res.status(403).json({
            message: "You don't have access to create users"
        })
    }
    const response = await getAllAdminsView()
    res.status(200).json({
        contentLength: response.length,
        data: response
    })
})

export const promoteUserController = asyncHandler(async (req, res) => {
    const creatorId = req.user.userId
    console.log(req.params, req.params.id)
    const userId = req.params.id
    const creatorRole = (await getOneUserView(creatorId))[0].role
    if (creatorRole !== "admin") {
        return res.status(403).json({
            message: "You don't have access to create users"
        })
    }
    const updatedUser = (await getOneUserView(userId))[0]
    if (updatedUser === undefined) {
        return res.status(403).json({
            message: "Couldn't find a User"
        })
    } else if (updatedUser.role == "admin") {
        return res.status(403).json({
            message: "User already is admin"
        })
    }

    const response = await promoteUserView(userId)
    res.status(200).json({
        message: "Promote User to admin role"
    })
})