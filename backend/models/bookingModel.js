import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    event:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"event"
    },
    tickets:{
        type:Number,
        required :true
    },
    totalAmount:{
        type:Number,
        required:true
    },
    paymemtStatus:{
        type:String,
        enum:["pending","success","failed"],
        default:"pending"
    },
    qrcode:{
        type:String
    }
},{timestamps:true})

const bookingModel = mongoose.model.booking || mongoose.model("booking",bookingSchema)

export default bookingModel