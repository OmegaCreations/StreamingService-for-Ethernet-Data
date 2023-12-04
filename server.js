// Main Server file
// Imports
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
// app.set('views', 'views'); // set views folder

// Routes
const indexRoute = require('./routes/index');
const streamRoute = require('./routes/stream');

// Body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

// External routes for application
// /ml/ for all content of Machine Learning Project
app.use('/ml', streamRoute.routes); // module.routes
// Welcome page
app.use(indexRoute.routes);

// Server listen
app.listen(3000);