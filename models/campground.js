var mongoose = require("mongoose");

var camproundSchema = new mongoose.Schema({
    name: String,
    image : String,
    desc : String,
    price : String, 
    author:  {id: { type: mongoose.Schema.Types.ObjectId, ref: "user"},
    username: String
        
    },

    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

module.exports = mongoose.model("Campground",camproundSchema);