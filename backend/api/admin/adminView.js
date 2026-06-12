import { getAllAdminsModel, promoteUserModel } from "./adminModel.js"

export const getAllAdminsView = async () => {
    const response = await getAllAdminsModel()
    return response
}

export const promoteUserView = async (id) => {
    const response = await promoteUserModel(id)
    return response
}