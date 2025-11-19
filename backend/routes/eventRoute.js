import express from 'express';
import {createEvent,deletEvent,getEvents, updateEvent} from '../controllers/eventController.js';
import { authMiddleware } from '../middleware/auth.js';
import { authAdminMiddleware } from '../middleware/authAdmin.js';

const eventRouter = express.Router();

eventRouter.post("/create",authMiddleware, authAdminMiddleware, createEvent)
eventRouter.get("/",getEvents);
eventRouter.put("/:id",authMiddleware,authAdminMiddleware,updateEvent)
eventRouter.delete("/:id",authMiddleware,authAdminMiddleware,deletEvent)

export default eventRouter