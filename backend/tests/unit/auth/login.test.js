import { describe, test, expect, vi } from "vitest"

vi.mock("bcrypt", () => ({
    default: {
        compare: vi.fn()
    }
}))

vi.mock("../../../databaseConnection.js", () => ({
    databaseConnection: {
        query: vi.fn()
    }
}))

import bcrypt from "bcrypt"
import { databaseConnection } from "../../../databaseConnection.js"
import { loginUser } from "../../../api/auth/login/loginUser.js"

describe("loginUser tests", () => {

    test("Valid credentials", async () => {
        databaseConnection.query.mockResolvedValue([[{
            user_id: 1,
            login: "testLogin",
            role: "user",
            password: "hash"
        }]])

        bcrypt.compare.mockResolvedValue(true)

        const result = await loginUser("testLogin", "pass")

        expect(result).toEqual([1, "testLogin", "user"])
    })

    test("User not found", async () => {
        databaseConnection.query.mockResolvedValue([[]])
        let res = loginUser("testLogin", "pass")
        await expect(res
        ).rejects.toMatchObject({
            status: 400,
            message: "User not found"
        })
    })

    test("Invalid password", async () => {
        databaseConnection.query.mockResolvedValue([[{
            user_id: 1,
            login: "testLogin",
            role: "user",
            password: "hash"
        }]])
        bcrypt.compare.mockResolvedValue(false)
        let res = loginUser("testLogin", "pass")
        await expect(res).rejects.toMatchObject({
            status: 400,
            message: "Invalid password"
        })
    })
})