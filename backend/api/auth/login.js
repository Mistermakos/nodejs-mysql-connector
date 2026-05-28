import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { databaseConnection } from "../../databaseConnection.js"
import { asyncHandler } from "../../utils/asynchandler.js"
import { secretData } from "../../utils/secret.js"

const loginUser = asyncHandler(async (login, password) => {
    const [rows] = await databaseConnection.query(
        "SELECT user_id, login, role, password FROM Users WHERE login = ?",
        [login]
    );
    if (rows.length === 0) {
        const err = new Error("User not found");
        err.status = 400;
        throw err;
    }
    const user = rows[0];
    const validPassword = await bcrypt.compare(
        password,
        user.password
    );
    if (!validPassword) {
        const err = new Error("Invalid password");
        err.status = 400;
        throw err;
    }
    return [user.user_id, user.login, user.role]
})

const createJWT = asyncHandler(async (userId, login, role) => {
    const secret = secretData;

    // PAYLOAD = dane użytkownika (to co będzie w tokenie)
    // NIE wkładaj tu haseł!
    const payload = {
        userId: userId,
        login: login,
        role: role
    };

    // SIGN token = tworzy 3-częściowy JWT:
    // HEADER.PAYLOAD.SIGNATURE
    const token = jwt.sign(
        payload,        // dane
        secret,         // klucz do podpisu
        {
            expiresIn: "1h" // ważność tokena
        }
    );

    return token;
})

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
    });
})