var express =  require("express");
var router  = express.Router({mergeParams: true});
var campground = require("../models/campground");
var comment     = require("../models/comment");
var middleware = require("../middleware");


router.get("/new", middleware.isLoggedIn, function(req,res){
    campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err)
        }
        else{
            res.render("comments/new", {campground: campground});
        }
    })
    

})


//Comments Create
router.post("/", middleware.isLoggedIn, function(req,res){
    //lookup campground using id
    //create new comments and connect to campground and redirect after to showpage
    
    campground.findById(req.params.id, function(err,foundCampground){
            if(err){
                console.log(err)
            }
            else{
                comment.create(req.body.comment, function(err, createdComment){
                    if(err)
                    {   req.flash("error", "Something went wrong ")
                        console.log(err)}
                    else{
                        createdComment.author.id = req.user._id;
                        createdComment.author.username= req.user.username;
                        createdComment.save();
                        foundCampground.comments.push(createdComment)
                        foundCampground.save()
                        req.flash("success", "Successfully added comment")
                       
                        res.redirect("/campgrounds/"+req.params.id);
                       
                    }
                })
            }
    })


})

//COMMENT EDIT
router.get("/:comment_id/edit", middleware.checkCommentOwnership,  function(req,res){
    comment.findById(req.params.comment_id, function(err,foundComment){
        if(err){
            req.flash("error", "Something went wrong")
            console.log(err)
            res.redirect("back");
        }
        else{
           
            res.render("comments/edit",{comment: foundComment , campground_id: req.params.id});
        }
    })
   
})

router.put("/:comment_id", middleware.checkCommentOwnership, function(req,res){
    var date = new Date().toLocaleString({
        timeZone: 'Europe/Athens'
    });
    var data = {text: req.body.comment.text, updatedAt: date };
    console.log(date);
    comment.findByIdAndUpdate(req.params.comment_id, data,  function(err,updatedComment){
        if(err){
            req.flash("error", "Something went wrong")
            console.log(err)
            res.redirect("back");
        }
        else{ 
            req.flash("success", "Comment edited")
            res.redirect("/campgrounds/"+req.params.id);
        }
    })

    
})




//COMMENT DESTROY

router.delete("/:comment_id", middleware.checkCommentOwnership , function(req,res){
    comment.findByIdAndRemove(req.params.comment_id,function(err){
        if(err){
            console.log(err)
            res.redirect("back")
        }
        else{
            req.flash("success", "Comment deleted");
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
})










module.exports=router; 