import { app } from "./app.js"
import express from "express"

const server = express()
server.use(app)
server.listen(3000, () => {
    console.log("Everything works on port 3000")
})