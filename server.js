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
const streamRouteCOM = require('./routes/stream');
const streamRouteVideos = require('./routes/videos');

// Body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

// External routes for application
// /ml/ for all content of Machine Learning Project
app.use('/ml', streamRouteCOM.routes); // module.routes

// /data/ for all database retrieving content
app.use('/data', streamRouteVideos.routes); // module.routes

// Welcome page
app.use(indexRoute.routes);

// Server listen
app.listen(3000);