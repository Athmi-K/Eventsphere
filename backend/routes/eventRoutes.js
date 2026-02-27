import express from 'express';
import { getEvents, getEventById, registerForEvent } from '../controllers/eventController.js';

const router = express.Router();

router.route('/').get(getEvents);
router.route('/:id').get(getEventById);
router.route('/:id/register').post(registerForEvent);

export default router;
