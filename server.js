require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");

const mongoose = require("mongoose");
const session = require("express-session");
const User = require("./models/user");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
app.set("view-engine", "ejs");
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"))
  .catch((error) => console.log(error));
app.post("/signup", async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    await user.save();
    console.log("User Created");
    res.redirect("/");
  } catch {
    res.redirect("/");
  }
});
app.get("/", (req, res) => {
  res.render("index.ejs");
});
app.get("/register", (req, res) => {
  res.render("indexreg.ejs");
});
app.post("/signup", (req, res) => {
  res.render("/register");
});
let port = process.env.PORT || 5000;
app.listen(port, () => console.log("Server Started"));
