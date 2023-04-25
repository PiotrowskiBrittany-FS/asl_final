const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const quizRouter = require("./src/controllers/quizzes");
const questionRouter = require("./src/controllers/questions");
const authRouter = require("./src/controllers/auth");
const choiceRouter = require("./src/controllers/choices");
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

app.use("/quizzes", quizRouter);
app.use("/questions", questionRouter);
app.use("/choices", choiceRouter);
app.use("/auth", authRouter);

app.listen(3000);