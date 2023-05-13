const express = require("express");
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");
var cors = require("cors");
const multer = require("multer");
require("dotenv").config();

const post = process.env.PORT || 4000;

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(multer({ dest: "./public/uploads/" }).any());
app.use(cors());

app.use((req, res, next) => {
  if (req.files) {
    const file = req.files[0];
    if (file.size > 1024 * 1024 * 20) {
      return res.status(400).send({
        message: "File is too large (max 20MB)",
      });
    }
  }
  next();
});

app.get("/", (req, res) => {
  res.send(`Server is running [enviroment: ${process.env.environment}]`);
});

const routers = fs.readdirSync("./routers");
routers.forEach((router) => {
  try {
    console.log(`🔨  Creating router /${router} ...`);
    const routerPath = `./routers/${router}`;
    const routerName = router.replace(".js", "");
    app.use(`/${routerName}`, require(routerPath).router);
    console.log(`✔️  Router /${routerName} is created`);
  } catch (error) {
    console.error(`❌  Router /${router} is not created with error: ${error}`);
  }
});

app.listen(post, async () => {
  try {
    console.log(`🤖 Server is running on port ${post}`);
  } catch (error) {
    console.error(error);
  }
});
