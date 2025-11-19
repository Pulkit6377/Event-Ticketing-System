import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    bookingId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"booking",
        required:true
    },
    razorpayOrderId:{
        type:String
    },
    razorpayPaymentId:{
        type:String
    },
    razorpaySignature:{
        type:String
    },
    amount:{
        type:Number
    },
    status:{
        type:String,
        enum:["created","paid","failed"],
        default:"created"
    }
},{timestamps:true})

const paymentModel = mongoose.model("payment",paymentSchema)

export default paymentModel