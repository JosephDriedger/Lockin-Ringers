
const express = require('express');
const pagePaths = require('../constants/pagePaths');
const router = express.Router();

router.get('/', (req, res) => {
    res.render(pagePaths.contactPage, {
       title: 'Contact',
       pageStylesheet: '/css/pages/contact.css',
       pageScript: '/js/pages/contact.js'
    });
});

module.exports = router;
