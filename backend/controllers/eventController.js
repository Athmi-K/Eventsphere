import { query } from '../config/db.js';

// @desc    Fetch all events
// @route   GET /api/events
// @access  Public
export const getEvents = async (req, res, next) => {
    try {
        const { rows } = await query('SELECT * FROM events ORDER BY date ASC');
        res.json({ success: true, data: rows, message: 'Events fetched successfully' });
    } catch (error) {
        next(error);
    }
};

// @desc    Fetch single event
// @route   GET /api/events/:id
// @access  Public
export const getEventById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { rows } = await query('SELECT * FROM events WHERE id = $1', [id]);

        if (rows.length === 0) {
            res.status(404);
            throw new Error('Event not found');
        }

        res.json({ success: true, data: rows[0], message: 'Event fetched successfully' });
    } catch (error) {
        next(error);
    }
};

// @desc    Register for an event
// @route   POST /api/events/:id/register
// @access  Public
export const registerForEvent = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;

        if (!name || !email) {
            res.status(400);
            throw new Error('Please provide name and email');
        }

        // Check if event exists and get capacity info
        const { rows: eventRows } = await query('SELECT capacity FROM events WHERE id = $1', [id]);

        if (eventRows.length === 0) {
            res.status(404);
            throw new Error('Event not found');
        }

        const event = eventRows[0];

        // Check capacity
        const { rows: regRows } = await query('SELECT COUNT(*) as count FROM registrations WHERE event_id = $1', [id]);
        const currentRegistrations = parseInt(regRows[0].count);

        if (currentRegistrations >= event.capacity) {
            res.status(400);
            throw new Error('Event is at full capacity');
        }

        // Check if user already registered
        const { rows: existingReg } = await query('SELECT * FROM registrations WHERE event_id = $1 AND email = $2', [id, email]);

        if (existingReg.length > 0) {
            res.status(400);
            throw new Error('You have already registered for this event');
        }

        // Register user
        const insertQuery = `
      INSERT INTO registrations (event_id, name, email) 
      VALUES ($1, $2, $3) RETURNING id, name, email, registered_at
    `;
        const { rows: newReg } = await query(insertQuery, [id, name, email]);

        res.status(201).json({ success: true, data: newReg[0], message: 'Successfully registered for the event' });
    } catch (error) {
        next(error);
    }
};
