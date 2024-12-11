const mongoose=require("mongoose")

const NotificationSchema=new mongoose.Schema({
    from:{
        type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
    },
    to:{
        type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
    },
    type:{
        type:String,
        required:true,
        enum:["follow","like","comment"]
    },
    read:{
        type:Boolean,
        default:false
    }
},{timestamps:true})


module.exports=mongoose.model("Notification",NotificationSchema)