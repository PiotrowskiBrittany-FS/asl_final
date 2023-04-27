const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const quizzesCtrl = require("./src/controllers/quizzes");
const questionCtrl = require("./src/controllers/questions");
const authCtrl = require("./src/controllers/auth");
const choiceCtrl = require("./src/controllers/choices");
var session = require("express-session");
app.use(
  session({
    saveUninitialized: false,
    secret: "keyboard cat",
    cookie: { maxAge: 60000 },
  })
);

app.set("views", __dirname + "/src/views");
app.set("view engine", "twig");

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
    allowCrossDomain: true,
  })
);

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("home/home");
});

app.use('/quizzes', quizzesCtrl);
app.use('/questions', questionCtrl);
app.use('/choices', choiceCtrl);
app.use('/auth', authCtrl);

app.listen(3000);