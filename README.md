#  Event Ticketing System — Backend (Node.js + Express + MongoDB)

This is the **backend API** for the Event Ticketing System supporting:

* User Authentication (JWT)
* Admin & Super Admin Roles
* Event Management
* Booking System
* Razorpay Payment Gateway
* QR Code Ticket Generation
* Email Ticket Delivery
* Admin QR Scanner Verification

This backend is fully production‑ready and tested with Postman.

---

##  Folder Structure

```
backend/
├── config/
│   └── db.js
├── controllers/
│   ├── authController.js
│   ├── eventController.js
│   ├── bookingController.js
│   ├── paymentController.js
│   └── adminScanController.js
├── middleware/
│   ├── auth.js
│   └── authSuperAdmin.js
├── models/
│   ├── User.js
│   ├── Event.js
│   ├── Booking.js
│   └── Payment.js
├── routes/
│   ├── authRoutes.js
│   ├── eventRoutes.js
│   ├── bookingRoutes.js
│   ├── paymentRoutes.js
│   └── adminScanRoutes.js
├── server.js
└── .env
```

---

##  Features

###  Authentication

* JWT Authentication
* User Roles: **user**, **admin**, **superAdmin**

###  Event Management

* Super Admin creates events
* Admins manage assigned events

###  Booking System

* Users book tickets
* Seat availability is updated

###  Payments (Razorpay)

* Create Razorpay Order
* Verify Payment
* Save payment in DB

###  Email with QR Ticket

* Payment successful → user receives ticket via email
* Includes:

  * Event details
  * Booking details
  * QR Code (base64 image)

###  QR Scanner API for Admin

* Admin scans QR on entry
* Backend validates:

  * Ticket authenticity
  * Payment status
  * Entry not used earlier

---

##  Installation

###  Clone Repo

```
git clone <repo-url>
cd backend
```

###  Install Dependencies

```
npm install
```

###  Setup Environment Variables

Create `.env` file:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/event-ticketing
JWT_SECRET=your_jwt_secret

# Razorpay
RAZORPAY_KEY=your_razorpay_key
RAZORPAY_SECRET=your_razorpay_secret

# Email
MAIL_USER=youremail@gmail.com
MAIL_PASS=your_app_password
```

---

##  Running the Server

### Development

```
npm run dev
```

### Production

```
npm start
```

---

##  API Endpoints

###  Auth

| Method | Endpoint             | Description       |
| ------ | -------------------- | ----------------- |
| POST   | `/api/user/register` | Register User     |
| POST   | `/api/user/login`    | Login + JWT Token |

---

###  Events (Admin / Super Admin)

| Method | Endpoint             | Role        |
| ------ | -------------------- | ----------- |
| POST   | `/api/event/create` | Super Admin |
| GET    | `/api/event/`       | Public      |
| PUT    | `/api/event/:id`    | Super Admin |
| DELETE | `/api/event/:id`    | Super Admin |

---

###  Bookings

| Method | Endpoint               | Description                   |
| ------ | ---------------------- | ----------------------------- |
| POST   | `/api/booking/create` | Create booking                |
| GET    | `/api/booking/myBookings`     | Get logged‑in user's bookings |

---

###  Payments (Razorpay)

| Method | Endpoint                     | Description                  |
| ------ | ---------------------------- | ---------------------------- |
| POST   | `/api/payments/create-order` | Create Razorpay order        |
| POST   | `/api/payments/verify`       | Verify payment + Generate QR |

---

###  Admin QR Scan (Entry Gate)

| Method | Endpoint                        | Role       |
| ------ | ------------------------------- | ---------- |
| POST   | `/api/admin-scan/verify-ticket` | Admin only |

Validates ticket:

* Correct event?
* Payment success?
* Already used?
* Genuine booking?

---

##  Database Models

### User

```
name, email, password, role, assignedEvent
```

### Event

```
title, description, date, venue, totalSeats, availableSeats
```

### Booking

```
user, event, tickets, totalAmount, paymentStatus, qrCode, entryUsed
```

### Payment

```
razorpayOrderId, razorpayPaymentId, razorpaySignature
```

---

##  Email Ticket Format

* Event Title
* Event Date / Time
* Venue
* Tickets Count
* Total Amount
* QR Code for entry

---

##  Tech Stack

* **Node.js**
* **Express.js**
* **MongoDB + Mongoose**
* **JWT Auth**
* **Razorpay**
* **Nodemailer**
* **QRCode Generator**

---

##  Contributing

1. Fork project
2. Create a new branch
3. Commit changes
4. Submit PR

---



