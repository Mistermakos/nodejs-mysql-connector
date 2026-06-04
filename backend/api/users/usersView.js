import { getAllUsersModel, getOneUserModel, addOneUserModel, updateOneUserModel, deleteOneUserModel } from "./usersModel.js"

export const getAllUsersView = async () => {
    const response = await getAllUsersModel()
    return response
}

export const getOneUserView = async (id) => {
    const response = await getOneUserModel(id)
    return response
}

export const addOneUserView = async (login, password, role) => {
    const response = await addOneUserModel(login, password, role)
    return response
}

export const updateOneUserView = async (id, login, password) => {
    const response = await updateOneUserModel(id, login, password)
    return response
}

export const deleteOneUserView = async (id) => {
    const response = await deleteOneUserModel(id)
    return response
}