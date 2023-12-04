// Stream Route

// Imports
const express = require('express');
const path = require('path');
const rootDir = require('../utils/paths');

const router = express.Router();

// Res HTML Page
router.get('/stream', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'stream.html'));
});

exports.routes = router;