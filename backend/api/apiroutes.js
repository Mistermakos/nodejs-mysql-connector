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


let router = express.Router()

router
    .route("/auth/login")
    .post(await login)
router
    .route("/auth/register")
    .post(await register)

//Everything below requires valid JWT
router.use(await verifyToken)

router.route("/posts")
    .get(await getAllPostsController)
    .post(await addOnePostController)
router.route("/posts/:id")
    .get(await getOnePostController)
    .put(await updateOnePostController)
    .delete(await deleteOnePostController)
router.route("/users")
    .get(await getAllUsersController)
    .post(await addOneUserController)
router.route("/users/:id")
    .get(await getOneUserController)
    .put(await updateOneUserController)
    .delete(await deleteOneUserController)


export { router }