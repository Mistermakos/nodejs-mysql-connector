import express from "express"
import { login } from "./auth/login/login.js"
import { register } from "./auth/register.js"
import { verifyToken } from "../utils/verifyToken.js"
import {
    getAllPostsController,
    getOnePostController,
    addOnePostController,
    updateOnePostController,
    deleteOnePostController
} from "./posts/postsController.js"
import {
    getAllUsersController,
    getOneUserController,
    addOneUserController,
    updateOneUserController,
    deleteOneUserController
} from "./users/usersController.js"
import {
    getMeController,
    updateMeController,
    deleteMeController
} from "./users/meController.js"

let router = express.Router()

router
    .route("/auth/login")
    .post(login)
router
    .route("/auth/register")
    .post(register)

//Everything below requires valid JWT
router.use(verifyToken)

router.route("/posts")
    .get(getAllPostsController)
    .post(addOnePostController)
router.route("/posts/:id")
    .get(getOnePostController)
    .put(updateOnePostController)
    .delete(deleteOnePostController)
router.route("/users")
    .get(getAllUsersController)
    .post(addOneUserController)
router.route("/users/me/")
    .get(getMeController)
    .put(updateMeController)
    .delete(deleteMeController)
router.route("/users/:id")
    .get(getOneUserController)
    .put(updateOneUserController)
    .delete(deleteOneUserController)

export { router }