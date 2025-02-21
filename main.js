const path = require('path');
const os = require('os');
const fs = require('fs');
const resizeImag = require('resize-img')
const { app, BrowserWindow, Menu, ipcMain, shell } = require('electron');

const isMac = process.platform === 'darwin';
const isDev = process.env.NODE_ENV !== 'production';

let mainWindow

// create main window
function createMainWindow() {
  mainWindow = new BrowserWindow({
    title: 'Image Resizer',
    width: isDev? 1000 : 500,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
      /* normally 'preload: path.join(__dirname, 'preload.js')' should be enough but according to tutorial using Node means that 
      'contextIsolation: true' and 'nodeIntegration: true' are needed aswell*/
    }
  })
  //Open devtools if in dev env
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.loadFile(path.join(__dirname,'./renderer/index.html'));
}

// create about window
function createAboutWindow() {
  const aboutWindow = new BrowserWindow({
    title: 'About Image Resizer',
    width: 300,
    height: 300,
  })
  aboutWindow.loadFile(path.join(__dirname, './renderer/about.html'));
}

// app is ready

app.whenReady().then(() => {
  createMainWindow();

  // implement menu
  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu);

  // remove mainWindow from memory on close
  mainWindow.on('closed', () => (mainWindow = null));

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow()
    }
  })  
});

//Menu template
const menu = [
  ...(isMac ? [{
    label: app.name,
    submenu: [
      {
        label: 'About',
        click: createAboutWindow
      }
    ]
  }] : []),
  {
    role: 'fileMenu'
    /*
    we can make our own like the following but fileMenu does most of the work for us
      label: 'Quit',
      click: () => app.quit(),
      accelerator: 'CmdOrCtrl+W' 
      */
  },
  ...(!isMac ? [
    {
      label: 'Help',
      submenu: [
        {
          label: 'About',
          click: createAboutWindow
        }
      ]
    }
  ] : [])
];

//Respond to IPCrenderer resize
ipcMain.on('image:resize', (e, options) => {
  console.log('Received resize request:', options); // Debugging

  // Ensure `imgPath` is set
  if (!options.imgPath) {
    options.imgPath = path.join(os.homedir(), 'Documents', options.fileName); // Change this to the actual upload directory
  }

  options.dest = path.join(os.homedir(), 'imageresizer');

  console.log('Final image path:', options.imgPath); // Debugging
  console.log('Destination folder:', options.dest);

  resizeImage(options);
});

// resize the image
async function resizeImage({ imgPath, width, height, dest }) {
  try {    
    const newPath = await resizeImag(fs.readFileSync(imgPath), {
      width: +width,
      height: +height,
    });

    // Create filename
    const filename = path.basename(imgPath);

    // create destination folder if it doesn't exist
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest);
    }

    //write file to dest
    fs.writeFileSync(path.join(dest, filename), newPath);

    //send a succees to renderer
    mainWindow.webContents.send('image:done')

    // open dest folder
    shell.openPath(dest);

  } catch (error) {
    console.log(error)
  }
}

app.on('window-all-closed', () => {
  if (!isMac) {
    app.quit()
  }
});