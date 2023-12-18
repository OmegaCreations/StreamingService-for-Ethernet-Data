// Stream Route

// Imports ==========================================
const express = require('express');
const path = require('path');
const rootDir = require('../utils/paths'); // directory of root
const chokidar = require('chokidar');
const fs = require('fs');
// const { SerialPort } = require('serialport')

// router ============================================
const router = express.Router();

// Response with HTML Page ===========================
router.get('/stream', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'stream.html'));
});

const imagePath = path.join(rootDir, 'images'); // Ścieżka do folderu z obrazami
router.get('/com_port', (req, res) => {
    // Pobierz najnowszy obraz z folderu
    let latestImage = getLatestImage(imagePath);
    let oldImg;
    const noStreamImage = path.join(rootDir, 'public', 'stream', 'no_stream.png');

    // Jeśli obraz istnieje, wyślij go jako odpowiedź
    if (latestImage && latestImage!=oldImg) {
        oldImg = latestImage;
        res.sendFile(latestImage);
    } else {
        res.sendFile(noStreamImage);
    }
});

// Uruchom serwer na określonym porcie
watchImageFolder();

// Funkcja do pobierania najnowszego obrazu z folderu
function getLatestImage(folderPath) {
    const files = fs.readdirSync(folderPath);
    
    // Sortuj pliki według daty modyfikacji
    files.sort((a, b) => {
        return fs.statSync(`${folderPath}/${b}`).mtime.getTime() - fs.statSync(`${folderPath}/${a}`).mtime.getTime();
    });

    // Zwróć pełną ścieżkę do najnowszego obrazu
    return files.length > 0 ? `${folderPath}/${files[0]}` : null;
}

// Funkcja do monitorowania zmian w folderze
function watchImageFolder() {
    const watcher = chokidar.watch(imagePath, {
        ignored: /(^|[\/\\])\../, // Ignoruj ukryte pliki (zaczynające się od kropki)
        persistent: true
    });

    // Nasłuchuj zdarzenie zmiany w folderze
    watcher.on('change', (path) => {
        console.log(`Zmiana w pliku: ${path}`);
        // Aktualizuj stronę lub wykonaj inne czynności po zmianie w folderze
    });
}

exports.routes = router;    