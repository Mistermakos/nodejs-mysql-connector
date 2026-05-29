import express from "express"
import { login } from "./auth/login/login.js"
import { register } from "./auth/register.js"
import {
    getAllPostsController,
    getOnePostController,
    addOnePostController,
    updateOnePostController,
    deleteOnePostController
} from "./posts/postsController.js"

let router = express.Router()

router
    .route("/auth/login")
    .post(await login)
router
    .route("/auth/register")
    .post(await register)
router.route("/posts")
    .get(await getAllPostsController)
    .post(await addOnePostController)
router.route("/posts/:id")
    .get(await getOnePostController)
    .put(await updateOnePostController)
    .delete(await deleteOnePostController)

export { router }