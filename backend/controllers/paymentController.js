
import crypto from 'crypto'
import Razorpay from 'razorpay'
import paymentModel from '../models/paymentModel.js';


const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret:process.env.RAZORPAY_SECRET
});

export const createOrder = async(req,res) =>{
    const {amount} = req.body;

    const order = await razorpay.orders.create({
        amount:amount*100,
        currency:"INR"
    })

    return res.json({success:true,order})
}

export const verifyPayment = async (req, res) => {
    const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature
    } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSign = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(sign)
        .digest("hex");

    if (expectedSign !== razorpay_signature) {
        return res.json({ success: false, message: "Verification Failed" });
    }

    // SAVE IN DB (using camelCase)
    const payment = new paymentModel({
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature
    });

    await payment.save();

    return res.json({ success: true, message: "Payment Verified" });
};
