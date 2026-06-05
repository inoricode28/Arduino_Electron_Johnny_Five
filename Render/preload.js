const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    toggleLed: function(pin) {
        ipcRenderer.send('toggle-led', pin);
    }
});
