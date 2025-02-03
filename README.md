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


 ## Processes
 ### preloader
 we need access to path.join, Toastify.toast and os.homedir in renderer but renderer will not allow this, so we created a preloader with contextbridges to expose both functions to renderer as explained here https://www.electronjs.org/docs/latest/tutorial/tutorial-preload
 ### Render
  As mentioned above most of the renderer process html and css was copied from tutorial gitHub repository as it was outside of the scope of the course
  the exception to tbis was renderer.js as it was considered relevant to the course and made as a part of it.
  #### renderer.js
  #### loadImage
  we used an event listener, with this we can more easily target the image via e.target.files
### Main
  #### Main js
  ##### Boilerplate Code
  Copied standard code for opening windows correctly and shutting process down properly from https://www.electronjs.org/docs/latest/
  ##### WhenReady rather than On.ready
  we chose to use WhenReady as it returns a promise and is the most commonly used in the Electron documentation https://www.electronjs.org/docs/
