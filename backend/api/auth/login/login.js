import { asyncHandler } from "../../../utils/asynchandler.js"
import { createJWT } from "./createJWT.js"
import { loginUser } from "./loginUser.js"

export let login = asyncHandler(async (req, res) => {
    let { login, password } = req.body
    if (!login || !password) {
        return res.status(404).json({
            message: "Missing parameter (login or password)"
        })
    }

    //Error handling build downstream, and in asyncHandler
    // Get Users Role, id
    let [userId, userLogin, userRole] = await loginUser(login, password)

    // Generate JWT
    let token = await createJWT(userId, userLogin, userRole)

    return res.status(200).json({
        message: "Logged in!",
        token: token
    })
})