// Stream Route

// Imports ==========================================
const express = require('express');
const path = require('path');
const rootDir = require('../utils/paths'); // directory of root
const fs = require('fs'); // manipulate file system


// router ============================================
const router = express.Router();

// Response with HTML Page ===========================
router.get('/videos', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'videos.html'));
});


// Stream video via database =======================================
router.get('/videostream', (req, res, next) => {
    // range header to know which part of video send back to client
    const range = req.headers.range;
    console.log(range);
    if(!range){
        res.status(401).send("Requires Range header.");
    }
    const streamDataPath = path.join(rootDir, 'public', 'stream', 'liga.mp4');
    const streamDataSize = fs.statSync(streamDataPath).size;   

    // Parsing data
    const CHUNK_SIZE = 10 ** 6 // size of 1MB of data
    const start = Number(range.replace(/\D/g, "")); // Get starting byte from header and convert to number
    const end = Math.min(start + CHUNK_SIZE, streamDataSize-1); // End byte just for constant video testing

    // Response headers with data chunks
    const contentLength = end - start + 1;
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${streamDataSize}`, // Size of content sent
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
    }

    // 206 - sending partial content
    res.writeHead(206, headers);

    const stream = fs.createReadStream(streamDataPath, { start, end });
    stream.pipe(res);
});

exports.routes = router;