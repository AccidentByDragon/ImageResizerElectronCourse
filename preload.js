const os = require('os');
const path = require('path');
const Toastify = require('toastify-js');
const { contextBridge, ipcRenderer } = require('electron');

// we can also expose variables, not just functions
// we want access to os.homedir, electron.ipcRenderer, toastify-js and path.join in renderer so we make these contextbridges to expose them to renderer
contextBridge.exposeInMainWorld('os', {
  homedir: () => os.homedir(),
});
contextBridge.exposeInMainWorld('path', {
  join: (...args) => path.join(...args),
})
contextBridge.exposeInMainWorld('Toastify', {
  toast: (options) => Toastify(options).showToast(),
});
contextBridge.exposeInMainWorld('ipcRenderer', {
  send: (channel, data) => ipcRenderer.send(channel, data),
  on: (channel, func) => ipcRenderer.on(channel, (event, ...args) => func(...args))
});