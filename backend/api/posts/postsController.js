import { asyncHandler } from "../../utils/asynchandler.js"
import { getAllPostsView, getOnePostView, addOnePostView, updateOnePostView, deleteOnePostView } from "./postsView.js"

const postNotFoundChecker = async (dbResponse) => {
    try {
        if (!dbResponse) {
            const err = new Error("Post not found")
            err.status = 404
            throw err
        }
        return
    } catch (err) {
        throw err
    }
}

export const getAllPostsController = asyncHandler(async (req, res) => {
    const response = await getAllPostsView()
    res.status(200).json({
        contentLength: response.length,
        data: response
    })
})

export const getOnePostController = asyncHandler(async (req, res) => {
    let id = req.params.id
    const row = await getOnePostView(id)
    await userNotFoundChecker(row)
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
    const { id } = req.params
    const row = (await getOnePostView(id))[0]

    await userNotFoundChecker(row)


    if (req.user.userId != row.author_id) {
        const err = new Error("You are not the author")
        err.status = 403
        throw err
    }

    const updatedPost = {
        title: req.body.title ?? row.title,
        description: req.body.description ?? row.description
    }

    const response = await updateOnePostView(id, updatedPost)

    return res.status(200).json({
        message: "Post updated",
        data: updatedPost
    })
})

export const deleteOnePostController = asyncHandler(async (req, res) => {
    let id = req.params.id
    const row = (await getOnePostView(id))[0]

    await userNotFoundChecker(response)

    if (req.user.userId != row.author_id || req.user.role == "admin") {
        const err = new Error("You are not the author")
        err.status = 403
        throw err
    }
    const response = await deleteOnePostView(id)
    res.status(200).json({
        data: { message: "Data deleted successfully" }
    })
})