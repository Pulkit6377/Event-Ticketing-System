import userModel from "../models/userModel.js";
import eventModel from "../models/eventModel.js";
import Transporter from "../utils/mailer.js";
import crypto from 'crypto'


export const getAdminList = async(req,res) =>{
    try {
        const eventAdmins = await userModel.find({
        role:"admin"
    }).populate("assignedEvent")

    return res.json({success:true,message:"Event Admin Assigned",eventAdmins})
    } catch (error) {
        console.log(error);
        return res.json({success:true,message:"Error in assigning Admin"})
    }

}

export const assignEventToAdmin = async(req,res) =>{
    try {
        const {adminId,eventId} = req.body;

        const admin = await userModel.findById(adminId);
        if(!admin){
            return res.json({success:false,message:"Admin Not Found"});
        }

        const event = await eventModel.findById(eventId);
        if(!event){
            return res.json({success:false,message:"Event Not Found"});
        }

        const adminKey = crypto.randomBytes(8).toString("hex");
        admin.assignedEvent = eventId;
        admin.adminKey = adminKey;

        await admin.save();

        // Mail options
        const mailOptions = {
            from: process.env.MAIL_USER,
            to: admin.email,
            subject:"New Event Assigned to You",
            html:`
                <h2>You have been assigned a new Event</h2>
                <p><strong>Event:</strong> ${event.title}</p>
                <p><strong>Date:</strong> ${event.date}</p>
                <p><strong>Venue:</strong> ${event.venue}</p>
                <hr />
                <p><strong>Your Admin Access KEY:</strong> ${adminKey}</p>
                <hr/>
                <p> Login To your Dahboard to manage the event </p>
            `
        };

        try {
            await Transporter.sendMail(mailOptions);
            return res.json({success:true,message:"Event assigned and mail sent"});
        } catch (err) {
            console.log("Email failed:", err);
            return res.json({success:false,message:"Event assigned but email failed"});
        }

    } catch (error) {
        console.log(error);
        return res.json({success:false,message:"Error in assigning admin"});
    }
};
