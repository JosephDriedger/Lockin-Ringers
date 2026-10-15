
const express = require('express');
const rateLimit = require('express-rate-limit');
const pagePaths = require('../constants/pagePaths');
const StatusCodes = require('../constants/statusCodes');
const Utils = require('../modules/utils');
const Mailer = require('../modules/mailer');
const ServerMessages = require('../lang/en/serverMessages');
const ErrorMessages = require('../lang/en/errorMessages');
const router = express.Router();

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LENGTHS = { name: 100, email: 254, date: 200, location: 200, message: 5000 };

// Stricter limit than the global one to keep the form from being used to spam the inbox
const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => Utils.httpResponse(res, StatusCodes.TOO_MANY_REQUESTS, ServerMessages.tooManyRequests)
});

router.get('/', (req, res) => {
    res.render(pagePaths.contactPage, {
       title: 'Contact',
       pageStylesheet: '/css/pages/contact.css',
       pageScript: '/js/pages/contact.js'
    });
});

router.post('/', contactLimiter, async (req, res) => {
    const body = req.body || {};
    const fields = {};

    for (const key of Object.keys(MAX_LENGTHS)) {
        fields[key] = typeof body[key] === 'string' ? body[key].trim() : '';
    }

    if (!fields.name || !fields.email || !fields.message) {
        return Utils.httpResponse(res, StatusCodes.BAD_REQUEST, ErrorMessages.contactMissingFields);
    }

    if (!EMAIL_PATTERN.test(fields.email)) {
        return Utils.httpResponse(res, StatusCodes.BAD_REQUEST, ErrorMessages.contactInvalidEmail);
    }

    if (Object.keys(MAX_LENGTHS).some((key) => fields[key].length > MAX_LENGTHS[key])) {
        return Utils.httpResponse(res, StatusCodes.BAD_REQUEST, ErrorMessages.contactFieldTooLong);
    }

    // Honeypot: bots fill the hidden field, so pretend success without sending
    if (typeof body.website === 'string' && body.website.trim()) {
        return Utils.httpResponse(res, StatusCodes.OK, ServerMessages.contactSent);
    }

    if (!Mailer.isConfigured()) {
        console.error(ErrorMessages.mailNotConfigured);
        return Utils.httpResponse(res, StatusCodes.SERVICE_UNAVAILABLE, ErrorMessages.contactSendFailed);
    }

    try {
        await Mailer.sendBookingRequest(fields);
        Utils.httpResponse(res, StatusCodes.OK, ServerMessages.contactSent);
    } catch (err) {
        console.error('Failed to send booking email:', err);
        Utils.httpResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, ErrorMessages.contactSendFailed);
    }
});

module.exports = router;
