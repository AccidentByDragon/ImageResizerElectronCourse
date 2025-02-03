// Some JavaScript to load the image and show the form. There is no actual backend functionality. This is just the UI
// the following is to import relevant parts from the html
const form = document.querySelector('#img-form');
const img = document.querySelector('#img');
const outputPath = document.querySelector('#output-path');
const filename = document.querySelector('#filename');
const heightInput = document.querySelector('#height');
const widthInput = document.querySelector('#width');

//prefer my event listeners here at the top so i cna see what exists quickly
img.addEventListener('change', loadImage); // this is the event that triggers the vast majority of the work in th render
form.addEventListener('submit', resizeImage);

//functions
// load image because its being called by an event listener we cna use e.target.files to grab the image, its uploaded as an array even if its one object
function loadImage(e) {
  const file = e.target.files[0];

  if (!isFileImage(file)) {
    alertError('File is not an image, please select an image')
    //replace with alert later
    return;
  };

  // get original dimensions
  const image = new Image();
  image.src = URL.createObjectURL(file);
  image.onload = function () {
    widthInput.value = this.width;
    heightInput.value = this.height;
  };

  // form 
  form.style.display = 'block';
  filename.innerHTML = img.files[0].name;
  outputPath.innerText = path.join(os.homedir(), 'imageresizer');
}

// make sure uploads are images, we currently only accept png, jpeg and gif
function isFileImage(file) {
  const acceptedImageTypes = ['image/gif', 'image/png', 'image/jpeg'];
  return file && acceptedImageTypes.includes(file['type']);
}

// send image to main via IPC handler
function resizeImage(e) {
  e.preventDefault();

  if (!img.files[0]) {
    alertError('Please upload an image');
    return;
  }

  if (widthInput === '' || heightInput === '') {
    alertError('Please fill in a height and width');
    return;
  }
  const imgPath = img.files[0].path;
  const width = widthInput.value;
  const height = heightInput.value;
  console.log(imgPath) // the imgPath is undefined here why? imgPath = img.files[0].path should fill it but doesn't

  // send to main via IPC renderer
  ipcRenderer.send('image:resize', {
    imgPath,
    width,
    height
  });
}

//cacth the image:done event
ipcRenderer.on('image:done', () => {
  alertSuccess(`image resized to ${widthInput.value} x ${heightInput.value}`);
})

// toastify alerts
function alertError(message) {
  Toastify.toast({
    text: message,
    duration: 5000,
    close: false,
    style: {
      background: 'red',
      color: 'white',
      textAlign: 'center'
    }
  })
}
function alertSuccess(message) {
  Toastify.toast({
    text: message,
    duration: 5000,
    close: false,
    style: {
      background: 'green',
      color: 'white',
      textAlign: 'center'
    }
  })
}