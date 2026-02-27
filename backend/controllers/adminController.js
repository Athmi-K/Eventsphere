import jwt from 'jsonwebtoken';
import { query } from '../config/db.js';

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Admin Data Login
// @route   POST /api/admin/login
// @access  Public
export const adminLogin = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        // Hardcode simplistic admin for this demo
        // In production this should be in DB with hashed password using bcrypt
        if (username === 'admin' && password === 'admin123') {
            res.json({
                success: true,
                data: {
                    username: 'admin',
                    token: generateToken('admin_uuid_123'),
                },
                message: 'Login successful'
            });
        } else {
            res.status(401);
            throw new Error('Invalid username or password');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Create an event
// @route   POST /api/admin/events
// @access  Private
export const createEvent = async (req, res, next) => {
    try {
        const { title, description, date, location, capacity } = req.body;

        if (!title || !description || !date || !location || !capacity) {
            res.status(400);
            throw new Error('Please fill all fields');
        }

        const insertQuery = `
      INSERT INTO events (title, description, date, location, capacity) 
      VALUES ($1, $2, $3, $4, $5) RETURNING *
    `;

        const { rows } = await query(insertQuery, [title, description, date, location, capacity]);

        res.status(201).json({ success: true, data: rows[0], message: 'Event created successfully' });
    } catch (error) {
        next(error);
    }
};

// @desc    Update an event
// @route   PUT /api/admin/events/:id
// @access  Private
export const updateEvent = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, description, date, location, capacity } = req.body;

        const { rows: eventRows } = await query('SELECT * FROM events WHERE id = $1', [id]);

        if (eventRows.length === 0) {
            res.status(404);
            throw new Error('Event not found');
        }

        const updateQuery = `
      UPDATE events 
      SET title = $1, description = $2, date = $3, location = $4, capacity = $5
      WHERE id = $6 RETURNING *
    `;

        const { rows } = await query(updateQuery, [title, description, date, location, capacity, id]);

        res.json({ success: true, data: rows[0], message: 'Event updated successfully' });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all registrations for an event
// @route   GET /api/admin/events/:id/registrations
// @access  Private
export const getEventRegistrations = async (req, res, next) => {
    try {
        const { id } = req.params;

        const { rows: eventRows } = await query('SELECT * FROM events WHERE id = $1', [id]);

        if (eventRows.length === 0) {
            res.status(404);
            throw new Error('Event not found');
        }

        const { rows: regs } = await query('SELECT * FROM registrations WHERE event_id = $1 ORDER BY registered_at DESC', [id]);

        res.json({ success: true, data: regs, message: 'Registrations fetched successfully' });
    } catch (error) {
        next(error);
    }
};
