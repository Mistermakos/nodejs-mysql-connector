import { asyncHandler } from "../../utils/asynchandler.js"
import { updateOneUserController, getOneUserController, deleteOneUserController } from "./usersController.js"

export const getMeController = asyncHandler(async (req, res) => {
    req.params.id = req.user.userId
    return await getOneUserController(req, res)
})

export const updateMeController = asyncHandler(async (req, res) => {
    req.params.id = req.user.userId
    return await updateOneUserController(req, res)
})

export const deleteMeController = asyncHandler(async (req, res) => {
    req.params.id = req.user.userId
    return await deleteOneUserController(req, res)
})