// Welcome page route

// Imports
const rootDir = require('../utils/paths');
const path = require('path');
const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'index.html'));
});

exports.routes = router;