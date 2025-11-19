import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    venue:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    coverImage:{
        type:String,
    },
    ticketPrice:{
        type:Number,
        required:true
    },
    totalSeats:{
        type:Number,
        required:true
    },
    availableSeats:{
        type:Number,
        required:true
    },

    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "user"
    },

    createdAt:{
        type:Date,
        default:Date.now
    }
});

const eventModel = mongoose.model.event ||  mongoose.model("event",eventSchema);

export default eventModel;