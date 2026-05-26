import bcrypt from "bcrypt"
import { databaseConnection } from "../../databaseConnection.js"
import { asyncHandler } from "../../utils/asynchandler.js"

const registerUser = async (login, password) => {
    let [searchResult] = await databaseConnection.query(
        "SELECT COUNT(*) as count FROM `Users` WHERE `login` = ?",
        [String(login)]
    );

    if (searchResult[0].count > 0) {
        const err = new Error("User already exists")
        err.status = 400
        throw err;
    }

    //async handler handles error handling in this case
    const hashedPassword = await bcrypt.hash(password, 10);
    let [insertResult] = await databaseConnection.query(
        'INSERT INTO `Users`(login, password, role) VALUES (?,?, "user")',
        [String(login), hashedPassword]
    );
}

export const register = asyncHandler(async (req, res) => {
    const { login, password } = req.body;

    if (!login || !password) {
        return res.status(400).json({
            message: "Missing parameter (login and password)"
        });
    }

    await registerUser(login, password)

    return res.status(200).json({
        message: "Registration accepted!"
    });
});