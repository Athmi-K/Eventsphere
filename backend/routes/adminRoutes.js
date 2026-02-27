import express from 'express';
import { adminLogin, createEvent, updateEvent, getEventRegistrations } from '../controllers/adminController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/login', adminLogin);

// Protected routes
router.use(protect);
router.route('/events')
    .post(createEvent);

router.route('/events/:id')
    .put(updateEvent);

router.route('/events/:id/registrations')
    .get(getEventRegistrations);

export default router;
