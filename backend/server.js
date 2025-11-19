import express from 'express';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
dotenv.config();
import userRouter from './routes/userRoute.js';
import eventRouter from './routes/eventRoute.js';
import BookingRouter from './routes/bookingRoute.js';
import assignRouter from './routes/adminAssignmentRoutes.js';
import paymentRouter from './routes/paymentRoute.js';


const app = express();



const PORT = process.env.PORT || 8000;
console.log("PORT VALUE:", PORT);

app.use(express.json());

connectDB();


app.get('/',(req,res)=>{
    res.json("API Working")
})

app.use('/api/user',userRouter);
app.use('/api/event',eventRouter);
app.use('/api/booking',BookingRouter)
app.use('/api/system-admin',assignRouter)
app.use("/api/payments",paymentRouter)

console.log("BEFORE LISTEN");

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

