const express = require('express');
const { body, validationResult } = require('express-validator');
const RSVP = require('../models/RSVP');
const logger = require('../utils/logger');

const router = express.Router();

// Validation middleware
const validateRSVP = [
  body('fullName')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Full name must be between 2 and 100 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('phoneNumber')
    .trim()
    .isLength({ min: 10, max: 20 })
    .withMessage('Phone number must be between 10 and 20 characters'),
  body('attending')
    .isIn(['Yes', 'No'])
    .withMessage('Please select a valid attendance option'),
  body('numberOfGuests')
    .if(body('attending').equals('Yes'))
    .isInt({ min: 1, max: 5 })
    .withMessage('Number of guests must be between 1 and 5'),
  body('mealPreference')
    .if(body('attending').equals('Yes'))
    .isIn(['Veg', 'Non-Veg', 'Vegan', 'No Preference'])
    .withMessage('Please select a valid meal preference'),
  body('arrivalDate')
    .if(body('attending').equals('Yes'))
    .isISO8601()
    .withMessage('Please provide a valid arrival date'),
  body('departureDate')
    .if(body('attending').equals('Yes'))
    .isISO8601()
    .withMessage('Please provide a valid departure date'),
  body('travelMethod')
    .if(body('attending').equals('Yes'))
    .isIn(['Car', 'Flight', 'Train', 'Bus', 'Other'])
    .withMessage('Please select a valid travel method'),
  body('songRequest')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Song request/message cannot exceed 500 characters'),
  body('allergies')
    .optional()
    .trim()
    .isLength({ max: 300 })
    .withMessage('Allergies/special needs cannot exceed 300 characters')
];

// POST /api/rsvp - Submit new RSVP
router.post('/', validateRSVP, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.warn('RSVP validation failed', { errors: errors.array() });
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { 
      fullName, 
      email, 
      phoneNumber, 
      attending, 
      numberOfGuests, 
      mealPreference, 
      arrivalDate, 
      departureDate, 
      travelMethod, 
      songRequest, 
      allergies 
    } = req.body;

    // Check if email already exists
    const existingRSVP = await RSVP.findOne({ email });
    if (existingRSVP) {
      logger.warn('Duplicate RSVP attempt', { email });
      return res.status(409).json({
        message: 'An RSVP with this email already exists. Please contact us if you need to update your response.'
      });
    }

    // Create new RSVP
    const rsvpData = {
      fullName,
      email,
      phoneNumber,
      attending,
      songRequest,
      allergies
    };

    // Only include additional fields if attending
    if (attending === 'Yes') {
      rsvpData.numberOfGuests = numberOfGuests;
      rsvpData.mealPreference = mealPreference;
      rsvpData.arrivalDate = arrivalDate;
      rsvpData.departureDate = departureDate;
      rsvpData.travelMethod = travelMethod;
    }

    const newRSVP = new RSVP(rsvpData);
    await newRSVP.save();

    logger.info('New RSVP submitted successfully', {
      email,
      attending,
      numberOfGuests: rsvpData.numberOfGuests,
      mealPreference: rsvpData.mealPreference,
      travelMethod: rsvpData.travelMethod
    });

    res.status(201).json({
      message: 'Thank you for your RSVP! We look forward to celebrating with you.',
      rsvp: newRSVP
    });

  } catch (error) {
    logger.error('Error submitting RSVP:', error);
    res.status(500).json({
      message: 'Something went wrong while submitting your RSVP. Please try again.'
    });
  }
});

// GET /api/rsvp - Get all RSVPs (for admin page)
router.get('/', async (req, res) => {
  try {
    const rsvps = await RSVP.find({})
      .sort({ submittedAt: -1 })
      .select('-__v');

    // Calculate totals
    const totalRSVPs = rsvps.length;
    const attendingCount = rsvps.filter(rsvp => rsvp.attending === 'Yes').length;
    const totalGuests = rsvps
      .filter(rsvp => rsvp.attending === 'Yes')
      .reduce((sum, rsvp) => sum + (rsvp.numberOfGuests || 0), 0);

    logger.info('RSVPs retrieved for admin', {
      totalRSVPs,
      attendingCount,
      totalGuests
    });

    res.json({
      rsvps,
      summary: {
        totalRSVPs,
        attendingCount,
        totalGuests
      }
    });

  } catch (error) {
    logger.error('Error retrieving RSVPs:', error);
    logger.error('Error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    res.status(500).json({
      message: 'Error retrieving RSVP data',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Database error'
    });
  }
});

// GET /api/rsvp/summary - Get RSVP summary only
router.get('/summary', async (req, res) => {
  try {
    const rsvps = await RSVP.find({});
    
    const summary = {
      totalRSVPs: rsvps.length,
      attendingCount: rsvps.filter(rsvp => rsvp.attending === 'Yes').length,
      totalGuests: rsvps
        .filter(rsvp => rsvp.attending === 'Yes')
        .reduce((sum, rsvp) => sum + (rsvp.numberOfGuests || 0), 0)
    };

    res.json(summary);

  } catch (error) {
    logger.error('Error retrieving RSVP summary:', error);
    res.status(500).json({
      message: 'Error retrieving RSVP summary'
    });
  }
});

module.exports = router;
