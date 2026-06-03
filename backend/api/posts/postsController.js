import { asyncHandler } from "../../utils/asynchandler.js"
import { getAllPostsView, getOnePostView, addOnePostView, updateOnePostView, deleteOnePostView } from "./postsView.js"

export const getAllPostsController = asyncHandler(async (req, res) => {
    const response = await getAllPostsView()
    res.status(200).json({
        contentLength: response.length,
        data: response
    })
})

export const getOnePostController = asyncHandler(async (req, res) => {
    let id = req.params.id
    const response = await getOnePostView(id)
    res.status(200).json({
        data: response
    })
})

export const addOnePostController = asyncHandler(async (req, res) => {
    const { title, description } = req.body
    const creatorId = req.user.userId
    const response = await addOnePostView(title, description, creatorId)
    res.status(200).json({
        data: { message: "Data added successfully" }
    })
})

export const updateOnePostController = asyncHandler(async (req, res) => {
    //JWT validation
    //Has to allow change to single or multiple parameters
    const response = await updateOnePostView()
    res.status(200).json({
        data: { message: "Data updated successfully" }
    })
})

export const deleteOnePostController = asyncHandler(async (req, res) => {
    //JWT validation
    let id = req.params.id
    const response = await deleteOnePostView(id)
    res.status(200).json({
        data: { message: "Data deleted successfully" }
    })
})