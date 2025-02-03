// Some JavaScript to load the image and show the form. There is no actual backend functionality. This is just the UI
// the following is to import relevant parts from the html
const form = document.querySelector('#img-form');
const img = document.querySelector('#img');
const outputPath = document.querySelector('#output-path');
const filename = document.querySelector('#filename');
const heightInput = document.querySelector('#height');
const widthInput = document.querySelector('#width');

//prefer my event listeners here at the top so i cna see what exists quickly
img.addEventListener('change', loadImage);

//functions
// load image because its being called by an event listener we cna use e.target.files to grab the image, its uploaded as an array even if its one object
function loadImage(e) {
  const file = e.target.files[0];

  if (!isFileImage(file)) {
    console.log('placeholder error');
    //replace with alert later
    return;
  }
  // get original dimensions
  const image = new Image();
  image.src = URL.createObjectURL(file);
  image.onload = function(){
    widthInput.value = this.width;
    heightInput.value = this.height;
  }

  // form 
  //console.log('success')
  form.style.display = 'block';
  filename.innerText = file.name;
}
// make sure uploads are images, we currently only accept png, jpeg and gif
function isFileImage(file) {
  const acceptedImageTypes = ['image/gif', 'image/png', 'image/jpeg'];
  return file && acceptedImageTypes.includes(file['type']);
}