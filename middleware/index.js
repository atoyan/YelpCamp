// all the middleware goes here
campground = require("../models/campground");
comment    = require("../models/comment");

var middlewareObj = {  } ;

middlewareObj.checkCampgroundOwnership =  (req,res,next)=>{

    if(req.isAuthenticated()){
           

        campground.findById(req.params.id ,  (err,foundCampground)=>{
            if(err){
                console.log(err)
                req.flash("error" , "Campground not found");
                 res.redirect('/campgrounds');
            }else
            {   
                if(foundCampground.author.id.equals(req.user._id)){
               next()   
            }   
                else{req.flash("error" , "You don't have permission to do that");
                    res.redirect("back")}
            
             
            }
        });
    }
    else{
        req.flash("error", "You need to be logged in to do that");
        res.redirect('back');
    }


    
};

middlewareObj.checkCommentOwnership =  (req,res,next)=>{

    if(req.isAuthenticated()){
           

        comment.findById(req.params.comment_id ,  (err,foundComment)=>{
            if(err){
                req.flash("error", "Comment not found");
                console.log(err)
                 res.redirect('/campgrounds');
            }else
            {   
                if(foundComment.author.id.equals(req.user._id)){
               next()   
            }
                else{   req.flash("error" , "You don't have permission to do that");
                    res.redirect("back")}
            
             
            }
        });
    }
    else{
        req.flash("error", "You need to be logged in to do that");
        res.redirect('back');
    }


    
};

middlewareObj.isLoggedIn =   (req,res, next)=>{
    if(req.isAuthenticated()){
        return next();
    }
        req.flash("error", "You need to be logged in to do that");
        res.redirect('/login');
    
} 




module.exports  = middlewareObj