var mongoose    =  require("mongoose");
var Campground  =  require("./models/campground");
var Comment     =  require("./models/comment");


    var data  = [
                {
                        name: "campground 1",
                        image: "https://www.reserveamerica.com/webphotos/NH/pid270015/0/540x360.jpg",
                        des: "description missing but it's ok"
                },
                {
                    name: "campground 2",
                    image: "https://www.reserveamerica.com/webphotos/NH/pid270015/0/540x360.jpg",
                    des: "description missing but it's ok again"
            }

    ];

   function seedDB(){
       //Remove All Campgrounds
    Campground.remove({},(err,result)=>{
        if(err){
            console.log(err);
        }
        else{

        console.log(result);
        Comment.remove({},(error,removed)=>{
                if(error){
                    console.log(error)
                }
                else{
                    console.log(removed);
                }
        })
    }
    });
}
       //Add new campgrounds
    // data.forEach((seed)=>{
    //     Campground.create(seed, (err,campground)=>{
    //         if(err){
    //             console.log(err)
    //         }
    //         else{
    //             console.log(campground);
                
    //             Comment.create({text: "this place is great but i wish there was internet", author: "Hommer"}, (err,commentCreated)=>{
    //                 if(err){
    //                     console.log(err)
    //                  }
    //                  else{
    //                      console.log(commentCreated);
    //                      campground.comments.push(commentCreated);
    //                      campground.save();
    //                  }
    //             })
    //         }
    //     });
    // })
    // }
  
    module.exports=seedDB;
   


    //Add few comments
   
    

   