import express from "express"
import { router } from "./api/apiroutes.js";


let server = express()

server.use(express.json())
server.use(express.urlencoded({ extended: true }));
server.use("/api/v1", router)
server.use((err, req, res, next) => {
    console.error(err);

    res.status(err.status || 500).json({
        errorMessage: err.message || "Internal Server Error",
    });
});


server.listen(3000, () => {
    console.log("Everything works on port 3000")
})