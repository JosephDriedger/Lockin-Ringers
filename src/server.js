
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');

const app = express();

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', './partials/layout');

// Ensure Express knows where to find views
app.set('views', path.join(__dirname, 'views'));

// Serve Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const homeRoutes = require('./routes/home');
const aboutRoutes = require('./routes/about');
const contactRoutes = require('./routes/contact');
const socialMediaRoutes = require('./routes/social-media');
app.use('/', homeRoutes);
app.use('/about', aboutRoutes);
app.use('/contact', contactRoutes);
app.use('/social-media', socialMediaRoutes);


// Ports
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
