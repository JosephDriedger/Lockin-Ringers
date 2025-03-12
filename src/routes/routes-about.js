
const express = require('express');
const pagePaths = require('../constants/pagePaths');
const router = express.Router();

router.get('/', (req, res) => {
    res.render(pagePaths.aboutPage, {
       title: 'About',
       pageStylesheet: '/css/pages/about.css',
       pageScript: '/js/pages/about.js'
    });
});

module.exports = router;
