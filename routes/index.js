var express =  require("express");
var router  = express.Router();
var user    = require("../models/user");
var passport = require("passport");


router.get("/",(req,res)=>{
    
    res.render("landing");
});



//AUTH ROUTES 

router.get("/register", (req,res)=>{

    res.render("register");
});

router.post("/register", (req,res)=>{
   
    user.register(new user({username: req.body.username}), req.body.password , (err,user)=>{
            if(err){ var errorMessage= err.message;
                    req.flash("error", errorMessage);
                           res.redirect("back");
                    }
                else{
            passport.authenticate("local")(req, res, ()=>{
                req.flash("success" , "Welcome to YelpCamp "+user.username+"!");
                 res.redirect('/campgrounds');
            });
        }
    });
});

//Show Login Form
router.get("/login", (req,res)=>{
    res.render("login" );
});

//HANDLING LOGIN LOGIC
router.post("/login", passport.authenticate("local",
 {    
     successRedirect: "/campgrounds", 
     failureRedirect: "/login",
     failureFlash : true,
     successFlash: 'Welcome!'
     

}), (req,res)=>{
    username= res.locals.currentUser.username;
    
});

//LOGOUT LOGIC

router.get("/logout", (req,res)=>{

    req.logout();
    req.flash("success", "You Have Logged Out");
    res.redirect("/campgrounds");
});


//Logged in function



module.exports=router;