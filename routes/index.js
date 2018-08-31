var express =  require("express");
var router  = express.Router();
var user    = require("../models/user");
var passport = require("passport");


router.get("/",function(req,res){
    
    res.render("landing");
});



//AUTH ROUTES 

router.get("/register", function(req,res){

    res.render("register");
});

router.post("/register", function(req,res){
   
    user.register(new user({username: req.body.username}), req.body.password , function(err,user){
            if(err){ var errorMessage= err.message;
                    req.flash("error", errorMessage);
                           res.redirect("back");
                    }
                else{
            passport.authenticate("local")(req, res, function(){
                req.flash("success" , "Welcome to YelpCamp "+user.username+"!");
                 res.redirect('/campgrounds');
            });
        }
    });
});

//Show Login Form
router.get("/login", function(req,res){
    res.render("login" );
});

//HANDLING LOGIN LOGIC
router.post("/login", passport.authenticate("local",
 {    
     successRedirect: "/campgrounds", 
     failureRedirect: "/login",
     failureFlash : true,
     successFlash: 'Welcome!'
     

}), function(req,res){
    username= res.locals.currentUser.username;
    
});

//LOGOUT LOGIC

router.get("/logout", function(req,res){

    req.logout();
    req.flash("success", "You Have Logged Out");
    res.redirect("/campgrounds");
});


//Logged in function



module.exports=router;