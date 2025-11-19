import bookingModel from "../models/bookingModel.js";
import eventModel from "../models/eventModel.js";

export const createBooking = async(req,res) =>{
    try {
        const {eventId,tickets} = req.body;

        const event = await eventModel.findById(eventId)
        if(!event){
            return res.json({success:false,message:"Event Not Found"})
        }
        if(event.availableSeats<tickets){
            return res.json({success:false,message:`Only ${event.availableSeats} seats Left`})
        }

        event.availableSeats -= tickets;
        await event.save();

        const booking = await bookingModel.create({
            user:req.user.id,
            event:eventId,
            tickets,
            totalAmount : tickets*event.ticketPrice,
            paymentStatus:"pending"
        })

        return res.json({success:true,message:"Booking created" ,booking})
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:"something went wrong in booking"})
    }
}

export const getMyBookings = async(req,res) =>{
    try {
        const bookings = await bookingModel.find({user:req.user.id}).populate("event")
        return res.json({success:true,bookings})
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:"Something Went Wrong in getiing bookings"})
    }
}