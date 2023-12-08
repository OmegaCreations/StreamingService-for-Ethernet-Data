// Stream Route

// Imports ==========================================
const express = require('express');
const path = require('path');
const rootDir = require('../utils/paths'); // directory of root
const { SerialPort } = require('serialport')

// router ============================================
const router = express.Router();

// Response with HTML Page ===========================
router.get('/stream', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'stream.html'));
});

// COM port data stream ==============================
// Setup serial port
const _PORT = "COM13";
const _BAUD_RATE = 9600;
var serial = new SerialPort({
    path: _PORT,
    baudRate: _BAUD_RATE,
    autoOpen: true,
}, function (err) {
    if (err)
    return console.log('Error: ', err.message)
});

// Convert given stream of bytes to CHUNKS
// It should allow to stream video with chunks
const dataToChunk = (data) => {
    const spaces = data.filter(x => x === ' ').length;
    if(spaces == 9215){
        // Print the received data
        console.log(spaces);
        console.log(" ^spaces, newlines V");
        console.log(data.filter(x => x === '\n').length);

        // Write the data to the file
        //file.write(data + '\n')
        // Example input string (replace this with your actual input string)
        //input_string = data
        // Specify the size of the image
        //let image_width = 96
        //let image_height = 96

        // give each generated file a unique, date-based filename
        // Get the current date and time
        //current_datetime = datetime.now()

        // Format the datetime string with hour underscored
        //formatted_datetime = current_datetime.strftime("%H_%M_%S")

        
        // Specify the output BMP file
        //let output_bmp_file = hourminute +"/p_"+formatted_datetime+".bmp";
        //console.log(output_bmp_file);

        // Create BMP from the input string
        //create_bmp_from_string(input_string, image_width, image_height, output_bmp_file)

        //console.log(`BMP image saved to ${output_bmp_file}`);
    }
};

router.get('/com_port', (req, res, next) => {
   // On serial opened
    serial.on('open', () => {
        console.log('open');

        // On data transmission
        serial.on('data', (data) => {
            // console log data converted buffer into (by default) UTF-8
            console.log(data.toString('utf-8')); 
            let convertable_data = data.toString('utf-8').trim(); // trimmed data
            dataToChunk(convertable_data);
        });
    }); 
});

exports.routes = router;