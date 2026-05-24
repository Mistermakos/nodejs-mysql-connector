import express from "express"
import { login } from "./auth/login.js"
import { register } from "./auth/register.js"

let router = express.Router("")

router
    .route("/auth/login")
    .post(await login)
router 
    .route("/auth/register")
    .post(await register)

export { router }