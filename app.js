const express = require("express")
const mongoose = require("mongoose");
const { getArticles, createArticle, getArticle, deletArticle, UpdateArticle, serach } = require("./Controller/articles");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { getUsers, registerUser, loginUser } = require("./Controller/User");
require("dotenv").config();
const uploadRouter = require('./routes/routerUplode')
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ credentials: true, origin: [ "http://localhost:3000" ] }));

const { router } = require("./routes/articles");
const userRouter = require("./routes/users")
const orderRouter = require('./routes/order')
app.use("/articles", router)
app.use("/users", userRouter)
app.use("/uploads", uploadRouter )
app.use("/order", orderRouter )
// Articles 
// router.get("/", getArticles)
// router.post("/", createArticle)
// router.get("/:id" ,  getArticle)
// router.delete("/:id", deletArticle)
// router.put("/:id", UpdateArticle)
// Users
// router.get("/", getUsers)
// router.post("/", registerUser)
// router.post("/", loginUser)

// 

app.listen(process.env.PORT,()=>{
console.log("server listening on port "+process.env.PORT)
})
mongoose.connect(process.env.DB_URL,
    console.log("Successfully connected to mongo")
)
