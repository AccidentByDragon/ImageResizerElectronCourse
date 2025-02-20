# ImageResizerElectronCOurse
## Description and Notes
 Course to learn electron by making a image resizer app
 ### Used dependancies and tools
 #### Toastify
 So we can use alerts
 #### Electron
 so it actually uses electron
 #### Electronmon
 used via npx command to avoid having to restart app after every change
 #### resize-img
 A codebase for reszing images, as making one ourselves was outside the scope of tutorial instead tutorial was focused on making an app that allowed easy interaction with this codebase.
 ### Note
 the CSS and html has been fetched from an online source as the creator of the course felt it wasn't necissary to go through during the course
### Known Issues
#### Image must be in Documents section
currently the app is hard coded to only accept images that are in the "Documents" file in the directory this can be changed in the code in fie: main.js line: 101; in future i would want to change this to allow the user to enter the specified folder, but for now this will do and it currently functions. NOTE: this does not work for subfolders in the "Documents" file so the image must exist in the "Documents" folder.
### Previous Issues
#### Errors with IMGpath in Renderer.js
for some reason IMGpath is becoming undefined despite it being identical to the tutorial code, attempted to fix it with AI prompts, the prompts used were: prompts:  1: "imgPath is becoming undefined, how can i make it correctly show the file path" followed by the code, prompt 2: "how can i construct the path with name?", prompt 3: "that didn't work, is there another way?", prompt 4: "this the following error: Error: ENOENT: no such file or directory"; It is worth noting that the tutorial is 2 years old so it is possible there has been a chnage in Electron that means it no longer works, tutorial itself has given no answers on why it is occuring.
This was resolved and found to due to Electron changes making path inaccesible in renderer.js
 ## Processes
 ### preloader
 we need access to path.join, Toastify.toast and os.homedir in renderer but renderer will not allow this, so we created a preloader with contextbridges to expose both functions to renderer as explained here https://www.electronjs.org/docs/latest/tutorial/tutorial-preload
 ### Render
  As mentioned above most of the renderer process html and css was copied from tutorial gitHub repository as it was outside of the scope of the course
  the exception to tbis was renderer.js as it was considered relevant to the course and made as a part of it.
  #### renderer.js
  ##### Event listneners
  the event listeners are there to manage the uploading of an image and submission of the form for changing the size
  ##### loadImage
  we used an event listener, with this we can more easily target the image via e.target.files
  ##### isFIleImage
  this is a simple function too check if the input file is actually image
  ##### resizeImage
  this handles the gathering of data with failsafes for height and width and begins the process of resizing the image before calling ipcRenderer to sending input image, widht and height to main
  ##### ipcRenderer.on
  shows a message to the user when sent a message to say the process is done by main
  ##### AlertSuccess
  sends a success message in green to say something has succeded
  ##### AlertFailiure
  sends a error message if the process fails.

### Main
  #### Main js
  ##### Boilerplate Code
  Copied standard code for opening windows correctly and shutting process down properly from https://www.electronjs.org/docs/latest/
  ##### WhenReady rather than On.ready
  we chose to use WhenReady as it returns a promise and is the most commonly used in the Electron documentation https://www.electronjs.org/docs/
  ##### Functions
  ###### createMainWindow
  the function for creating the mainWindow largely "boilerplate" code taken from the Electron documentation, with a few small changes to enable Node JS fucntionality, we also use some code to automatically open DevTools when not in Production mode
  ###### creatAboutWindow
  similar to createMainWindow this function creates an "about" window with the help of about.html
  ###### app.whenReady().then
  "app.whenready().then" is used to manage most of the startup such as loading menu
  ###### ipcMain.on
  this function is used to recieve communications from the renderer and call the image resizer function
  ###### imageResizer
  this function calls upon img-resizer funtionality to resize an image its sent from renderer.js
  as this is a promise function it has to be an async function. before sending a message to renderer
  ###### Menu 
  the menu consists of a exit and about function, wand includes functionality to open an about window and exit program when the menu options are pressed.