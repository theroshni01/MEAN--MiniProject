
var express = require("express"),
mongoose = require("mongoose"),
passport = require("passport"),
bodyParser = require("body-parser"),
LocalStrategy = require("passport-local"),
passportLocalMongoose =
    require("passport-local-mongoose"),
User = require("./model/user");

mongoose.connect("mongodb://127.0.0.1:27017/mvc");

var app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(require("express-session")({
secret: "Rusty is a dog",
resave: false,
saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get("/", function (req, res) {
res.render("home");
});


app.get("/profile", isLoggedIn, function (req, res) {
res.render("profile");
});


app.get("/register", function (req, res) {
res.render("register");
});


app.post("/register", function (req, res) {
var username = req.body.username
var password = req.body.password
var phoneNo = req.body.phoneNo
var Address = req.body.Address
User.register(new User({ username: username },{phoneNo: phoneNo}, {Address: Address}),
        password, function (err, user) {
    if (err) {
        console.log(err);
        return res.render("register");
    }

    passport.authenticate("local")(
        req, res, function () {
        res.render("profile");
    });
});
});

//Showing login form
app.get("/login", function (req, res) {
res.render("login");
});

//Handling user login
app.post("/login", passport.authenticate("local", {
successRedirect: "/profile",
failureRedirect: "/login"
}), function (req, res) {
});

//Handling user logout
app.get("/logout", function(req, res, next) {
req.logout(function(err) {
  if (err) {
    return next(err);
  }
  res.redirect("/");
});
});

function isLoggedIn(req, res, next) {
if (req.isAuthenticated()) return next();
res.redirect("/login");
}

var port = process.env.PORT || 8001;
app.listen(port, function () {
console.log("Server Has Started!");
});
