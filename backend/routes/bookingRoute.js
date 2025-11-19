import express from 'express'
import { createBooking, getMyBookings } from '../controllers/bookingController.js';
import { authMiddleware } from '../middleware/auth.js';


const BookingRouter = express.Router();

BookingRouter.post('/create',authMiddleware,createBooking)
BookingRouter.get('/myBookings',authMiddleware,getMyBookings)

export default BookingRouter