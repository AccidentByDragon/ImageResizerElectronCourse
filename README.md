# ImageResizerElectronCOurse
## Description and Notes
 Course to learn electron by making a image resizer app
 ### Used dependancies and tools
 #### Toastify
 So we can use alerts
 #### Electron
 so it actually uses electron
 #### Electronmon
 installed via npx command toa void ahving to restart app after every change
 #### resize-img
 not explained in tutorial but a codebase for resizing images
 ### Note
 the CSS and html has been fetched from an online source as the creator of the course felt it wasn't necissary to go through during the course


 ## Processes
 ### Render
  As mentioned above most of the renderer process html and css was copied from tutorial gitHub repository as it was outside of the scope of the course
  the exception to tbis was renderer.js as it was considered relevant to the course and made as a part of it.
  #### renderer.js
### Main
  #### Main js
  ##### Boilerplate Code
  Copied standard code for opening windows correctly and shutting process down properly from https://www.electronjs.org/docs/latest/
  ##### WhenReady rather than On.ready
  we chose to use WhenReady as it returns a promise and is the most commonly used in the Electron documentation https://www.electronjs.org/docs/
