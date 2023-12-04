// Stream Route

// Imports
const express = require('express');
const path = require('path');
const rootDir = require('../utils/paths');
const fs = require('fs');

const router = express.Router();

// Res HTML Page
router.get('/stream', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'stream.html'));
});

// Video endpoint

router.get('/video', (req, res, next) => {
    // range header to know which part of video send back to client
    const range = req.headers.range;
    
    if(!range)
    res.status(400).send("Requires Range header.");

    const streamDataPath = "../public/stream/example.mp4";
    const streamDataSize = fs.statSync(streamDataPath).size;   

    // Parsing data
    const CHUNK_SIZE = 10 ** 6 // size of 1MB of data
    const start = Number(range.replace(/\D/g, "")); // Get starting byte from header and convert to number
    const end = Math.min(start + CHUNK_SIZE, streamDataSize-1); // End byte just for constant video testing

    // TODO: Response headers with data chunks!
});


exports.routes = router;