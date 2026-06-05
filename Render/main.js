const { BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const five = require('johnny-five');

let window;
let leds = {};
let ledStates = {};

function createWindow() {
    window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    });
    window.loadFile('ui/index.html');
    
}

const board = new five.Board({
    port: "COM4",
    repl: false
});

board.on("ready", function() {
    console.log('Arduino listo en COM4');
    [11, 10, 9, 8].forEach(function(pin) {
        leds[pin] = new five.Led(pin);
        ledStates[pin] = false;
    });
});

ipcMain.on('toggle-led', function(event, pin) {
    if (leds[pin]) {
        leds[pin].toggle();
        ledStates[pin] = !ledStates[pin];
        console.log('LED ' + pin + ' -> ' + (ledStates[pin] ? 'ON' : 'OFF'));
    }
});

module.exports = { createWindow };
