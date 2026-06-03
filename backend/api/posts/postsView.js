import { getAllPostsModel, getOnePostModel, addOnePostModel, updateOnePostModel, deleteOnePostModel } from "./postsModel.js"

export const getAllPostsView = async () => {
    const response = await getAllPostsModel()
    return response
}

export const getOnePostView = async (id) => {
    const response = await getOnePostModel(id)
    return response
}

export const addOnePostView = async (title, description, creatorId) => {
    const response = await addOnePostModel(title, description, creatorId)
    return response
}

export const updateOnePostView = async (id, updatedPost) => {
    const response = await updateOnePostModel(id, updatedPost)
    return response
}

export const deleteOnePostView = async (id) => {
    const response = await deleteOnePostModel(id)
    return response
}