import eventModel from "../models/eventModel.js";

export const createEvent = async(req,res) => {
    const {title,description,venue,date,time,ticketPrice,totalSeats,availableSeats} = req.body;
    try {
        if(!title||!description||!venue||!date||!time){
            return res.json({success:false,message:"All feilds are Mandatory"});
        }

        const event = new eventModel({
            title , description , venue ,date , time,ticketPrice,totalSeats,availableSeats ,createdBy:req.user.id
        })

        await event.save();

        return res.json({success:true,message:"Event Created Succesfuly"})
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:"Event Creating Error"})
    }
}

export const getEvents = async(req,res) => {
    try {
        const Events = await eventModel.find();
        return res.json({success:true,Events})
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:"Something Went Wrong"})
    }
}

export const updateEvent = async(req,res) =>{
    try {
        const event = await eventModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
        return res.json({success:true,message:"Event Updated"})
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:"Something Went Wrong in updating"})
    }
}

export const deletEvent = async(req,res) =>{
    try {
        const event = await eventModel.findByIdAndDelete(req.params.id)
        return res.json({success:true,message:"Event Deleted Succesfully"})

    } catch (error) {
        console.log(error);
        return res.json({success:false,message:"Something went Wrong in Deletion"})
    }
}

