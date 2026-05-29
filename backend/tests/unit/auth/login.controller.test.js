import { describe, test, expect, vi } from "vitest"

// mock ONLY dependencies (nie cały moduł na sztywno)
vi.mock("../../../api/auth/login/loginUser.js", () => ({
    loginUser: vi.fn()
}))

vi.mock("../../../api/auth/login/createJWT.js", () => ({
    createJWT: vi.fn()
}))

// import AFTER mocks
import { login } from "../../../api/auth/login/login.js"
import { loginUser } from "../../../api/auth/login/loginUser.js"
import { createJWT } from "../../../api/auth/login/createJWT.js"

describe("login controller", () => {

    test("Should login user successfully", async () => {

        loginUser.mockResolvedValue([1, "test", "user"])
        createJWT.mockResolvedValue("fake-token")

        const req = {
            body: { login: "test", password: "123" }
        }

        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        }

        await login(req, res)

        expect(loginUser).toHaveBeenCalledWith("test", "123")
        expect(createJWT).toHaveBeenCalledWith(1, "test", "user")

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({
            message: "Logged in!",
            token: "fake-token"
        })
    })

    test("Should return 404 when missing login or password", async () => {

        const req = {
            body: { login: "", password: "" }
        }

        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        }

        await login(req, res)

        expect(res.status).toHaveBeenCalledWith(404)
        expect(res.json).toHaveBeenCalledWith({
            message: "Missing parameter (login or password)"
        })
    })
})