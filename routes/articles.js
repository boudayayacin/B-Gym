const express = require("express")
const { getArticles, createArticle, deletArticle, UpdateArticle, serach, filtrerByprix, filtrerByprixAc, pagination, getArticle } = require("../Controller/articles")
const { chekAuth } = require("../middleware/Auth")
const { role } = require("../middleware/role")
const upload = require("../utililites/multer-config")

const router = express.Router()
require("dotenv").config
router.get('/search', serach);
router.get('/sort', filtrerByprix)
router.get('/pagination', pagination)
router.get('/sortAc', filtrerByprixAc)
router.get("/", getArticles)
router.get("/:id", getArticle)

router.post("/", chekAuth, role('A') , upload.single('photo'), createArticle)
router.delete("/:id",chekAuth, role('A'), deletArticle)
router.put("/:id", chekAuth, role('A') , UpdateArticle)
module.exports = {router}