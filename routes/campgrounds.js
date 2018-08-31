var express =  require("express");
var router  = express.Router();
var campground = require("../models/campground");
var user       = require("../models/user");
var middleware = require("../middleware");



router.get("/",function(req,res){
    campground.find({},function(err,allCampgrounds){
        if(err){
            console.log(err);
             
        }
        else{
            console.log(allCampgrounds);
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
    
   
});




router.post("/", middleware.isLoggedIn,function(req,res){

var name= req.body.name;
var image= req.body.image;
var desc= req.body.desc;
var price = "$"+ req.body.price;
var user = {
    id: req.user._id,
    username: req.user.username
    
}
var newCampground = {name: name, image: image , desc: desc , author: user, price: price};
campground.create(newCampground ,function(err,newlyCreated){
    if(err){
        console.log(err);
    }
    else{
        console.log(newlyCreated);
         res.redirect("/campgrounds");
    }
      });
     });




    
     router.get ("/new",middleware.isLoggedIn, function(req, res) {
        res.render("campgrounds/new"); 
       });
       

router.get("/:id",function(req,res){

campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
  
  if(err){
      console.log(err);
  }
  
  else{
       res.render("campgrounds/show", {campground: foundCampground});
  }
  
});
});

//Edit Campground


router.get("/:id/edit",middleware.checkCampgroundOwnership, function(req,res){

           campground.findById(req.params.id , function (err,foundCampground){
           
            res.render("campgrounds/edit", {campground: foundCampground});
     });
});

//Update Campground
router.put("/:id", middleware.checkCampgroundOwnership, function(req,res){
    var data= {name: req.body.name , image: req.body.image, desc: req.body.desc}
    campground.findByIdAndUpdate(req.params.id, data , function(err,success){
        if(err){
            console.log(err)
            res.redirect("/campgrounds")
        }
        else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    });

});


//Destroy Campground

router.delete("/:id" , middleware.checkCampgroundOwnership, function (req,res){
    campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }
       res.redirect("/campgrounds"); 
       
    })
})










module.exports=router;