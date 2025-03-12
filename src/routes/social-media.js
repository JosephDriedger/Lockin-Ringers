
const express = require('express');
const pagePaths = require('../constants/pagePaths');
const router = express.Router();

router.get('/', (req, res) => {
    res.render(pagePaths.socialMediaPage, {
       title: 'Social Media',
       pageStylesheet: '/css/pages/social-media.css',
       pageScript: '/js/pages/social-media.js'
    });
});

module.exports = router;
