import { getAllAdminsView } from "./adminView.js"
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

