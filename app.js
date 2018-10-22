var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    flash       = require("connect-flash"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    campground  = require("./models/campground"),
    seedDB      = require("./seeds"),
    comment     = require("./models/comment"),
    user        = require("./models/user");

    
    var PORT = process.env.PORT || 3000;
        commentRoutes = require("./routes/comments"),
        campgroundRoutes = require("./routes/campgrounds"),
        indexRoutes          = require("./routes/index");


//Connect To DB
mongoose.connect("mongodb://localhost/yelp_camp");
//apply body parser to be able to view req.body 
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());

app.set("view engine", "ejs");

//seedDB();

// PASSPORT CONFIGURATION

app.use(require("express-session")({
    secret: "Andranik is the best",
    resave: false,
    saveUninitialized: false

}))




app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
        next();
    });
    
////////////////
//Requiring Routes

app.use(indexRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/campgrounds",campgroundRoutes);






app.listen(PORT,()=>{
    
    console.log("The YelpCamp Server Is Running");
});