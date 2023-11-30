import express from "express"
import * as pages from "../Controlers/pagescontroller.js"
const router = express.Router()


router.route("/Pages")
  .get(pages.getAllPages)
  .post(pages.addPage)
router.route("/Pages:id")
  .get(pages.getOnePage)
router.route("/SearchByAuthor")
  .get(pages.getByAuthor)
router.route("/SearchByTitle")
  .get(pages.getByTitle)
router.route("/SearchByLink")
  .get(pages.getByLink)
  
export default router