// Code by Gawain Hewitt gawainhewitt.co.uk December 2020
// Made using P5.js https://p5js.org/
// currently using an old version of P5.sound as the latest version causes glitches on Chrome browse on Android


var mode;               // store the detected device - i.e. mobile, tablet, computer
var NumberOfButtons;    // the number of buttons or switches we are using
var picSize;            // how big are the images in each case?
var imagePositionX;     // an array to store the position of the images in each case
var imagePositionY;     // an array to store the position of the images in each case
var imageFiles;         // array to store image files that we actually show them from - this is the array that keeps changing
var onImageFiles;       // these are the default image files to place back in above when we want it to show on again
var offImageFiles;      // these are the default image files to place back in above when we want it to show off again
var soundFiles;         // array to store sound files in to play
var translatePos1;      // variable to store the first translate argument in
var translatePos2;      // variable to store the second tranlsate arument in
var milliseconds;       // variable to compare against millis for animation
var info;               // is the info screen showing?

var sound1;             // these variables store the sounds
var sound2;
var sound3;
var sound4;
var sound5;
var sound6;
var sound7;
var sound8;

var image1;           // these variables store the images
var image2;
var image3;
var image4;
var image5;
var image6;
var image7;
var image8;
var orchlabLogo;
var lpoLogo;
var dmLogo;

var altImage1;        // these variables store the other images
var altImage2;
var altImage3;
var altImage4;
var altImage5;
var altImage6;
var altImage7;
var altImage8;

var lato; // font


function preload() {                                  // p5.js function which preloads media into the browser
  sound1 = loadSound('assets/one.mp3');
  sound2 = loadSound('assets/two.mp3');
  sound3 = loadSound('assets/three.mp3');
  sound4 = loadSound('assets/four.mp3');
  sound5 = loadSound('assets/five.mp3');
  sound6 = loadSound('assets/six.mp3');
  sound7 = loadSound('assets/seven.mp3');
  sound8 = loadSound('assets/eight.mp3');

  image1 = loadImage('assets/one.png');
  image2 = loadImage('assets/two.png');
  image3 = loadImage('assets/three.png');
  image4 = loadImage('assets/four.png');
  image5 = loadImage('assets/five.png');
  image6 = loadImage('assets/six.png');
  image7 = loadImage('assets/seven.png');
  image8 = loadImage('assets/eight.png');

  orchlabLogo = loadImage('assets/orchlablogo.jpg');
  lpoLogo = loadImage('assets/LPO_logo.png');
  dmLogo = loadImage('assets/DMLogo.png');

  altImage1 = loadImage('assets/one_2.png');
  altImage2 = loadImage('assets/two_2.png');
  altImage3 = loadImage('assets/three_2.png');
  altImage4 = loadImage('assets/four_2.png');
  altImage5 = loadImage('assets/five_2.png');
  altImage6 = loadImage('assets/six_2.png');
  altImage7 = loadImage('assets/seven_2.png');
  altImage8 = loadImage('assets/eight_2.png');

  lato = loadFont('assets/Lato-Regular.ttf');

}

function setup() {
  var renderer = createCanvas(windowWidth, windowHeight); // this paired with below solves the issue of full size screen with scroll bars
  renderer.canvas.style.display = 'block'; // see above - this pair solves scroll bars - adds CSS styling as block to the canvas we have made
  buttonState = [0, 0, 0, 0, 0, 0, 0, 0, 0]; // has a "button" been pressed?
  soundFiles = [sound1, sound2, sound3, sound4, sound5, sound6, sound7, sound8]; // sound files array
  imageFiles = [image1, image2, image3, image4, image5, image6, image7, image8]; // default image files
  offImageFiles = [image1, image2, image3, image4, image5, image6, image7, image8]; // collection of image files to load when sound is off
  onImageFiles = [altImage1, altImage2, altImage3, altImage4, altImage5, altImage6, altImage7, altImage8]; // collection of image files to load when sound is on
  NumberOfButtons = 8; // I use this at times instead of an integer. However if you change this you will want to change the buttonState array as well, and the files in the sound and image arrays to match
  picSize = 150; // default for picsize - is this even necessary to declare as I change it later? no idea. Not doing any harm though...
  imagePositionX = []; // setting up this variable as an array so I can place image position info in it later
  imagePositionY = []; // as above
  milliseconds = []; // I wanted to use this to improve the animations. At present it doesn't really do anything, but it is updates in the buttonPressed function so needs to remain live at least for now
  info = true; // show the info screen? used at startup
  textAlign(CENTER, CENTER); // where the text goes on the screen
}

function draw() {

  if (width < 500) { // test for portrait mobile
    mode  = 'portrait_mobile';
    picSize = height/4;
    translatePos1 = width/2 - picSize;
    translatePos2 = 0;
    imagePositionX = [picSize * 0, picSize * 1, picSize * 0, picSize * 1, picSize * 0, picSize * 1, picSize * 0, picSize * 1];
    imagePositionY = [picSize * 0, picSize * 0, picSize * 1, picSize * 1, picSize * 2, picSize * 2, picSize * 3, picSize * 3];

  }
  else if (width < 1000 && height < 500) { // test for landscape mobile
    mode  = 'landscape_mobile';
    picSize = width/4;
    translatePos1 = 0;
    translatePos2 = height/2 - picSize;
    imagePositionX = [picSize * 0, picSize * 1, picSize * 2, picSize * 3, picSize * 0, picSize * 1, picSize * 2, picSize * 3];
    imagePositionY = [picSize * 0, picSize * 0, picSize * 0, picSize * 0, picSize * 1, picSize * 1, picSize * 1, picSize * 1];

  }
  else if ((height < 1300 && height > 600) && (width < 1000 && width > 600)) { // test for landscape tablet
    mode  = 'portrait_tablet';
    picSize = height/4;
    translatePos1 = width/2 - picSize;
    translatePos2 = 0;
    imagePositionX = [picSize * 0, picSize * 1, picSize * 0, picSize * 1, picSize * 0, picSize * 1, picSize * 0, picSize * 1];
    imagePositionY = [picSize * 0, picSize * 0, picSize * 1, picSize * 1, picSize * 2, picSize * 2, picSize * 3, picSize * 3];

  } else if ((width < 1300 && width > 600) && (height < 1000 && height > 600)) { // test for landscape tablet
    mode  = 'landscape_tablet';
    picSize = width/4;
    translatePos1 = 0;
    translatePos2 = height/2 - picSize;
    imagePositionX = [picSize * 0, picSize * 1, picSize * 2, picSize * 3, picSize * 0, picSize * 1, picSize * 2, picSize * 3];
    imagePositionY = [picSize * 0, picSize * 0, picSize * 0, picSize * 0, picSize * 1, picSize * 1, picSize * 1, picSize * 1];

  } else {
    mode  = 'default';
    picSize = width/4;
    translatePos1 = 0;
    translatePos2 = height/2 - picSize;
    imagePositionX = [picSize * 0, picSize * 1, picSize * 2, picSize * 3, picSize * 0, picSize * 1, picSize * 2, picSize * 3];
    imagePositionY = [picSize * 0, picSize * 0, picSize * 0, picSize * 0, picSize * 1, picSize * 1, picSize * 1, picSize * 1];
  }

  //console.log(`mode: ${mode}`); //displays which mode it detects for debugging

// this next bit controls the info screen - also remember that translate is cumalative!

textFont(lato);

  if (info) {
    if ((mode ==='landscape_tablet') || (mode ==='default')) {
      background(245, 247, 247);
      imageMode(CORNER);
      image(orchlabLogo, (width/2 - (((height/5)*2.63)/2)), 10, ((height/5)*2.63), height/5);
      fill('#212529');
      textSize(height/10);
      text("Percussion Box", width/2, height/10 * 3);
      textSize(height/18);
      text('To play: touch or click screen,', width/2, height/10 * 4);
      text('or use ZXCVBNM, keys on a keyboard', width/2, height/10 * 5);
      text('On Apple devices, turn off silent mode.', width/2, height/10 * 6);
      imageMode(CORNERS);
      image(lpoLogo, width/4, ((height/10 * 8)-10), width/4 + ((height/10 *2) * 1.95), height -10);
      image(dmLogo, width/4 * 3 - ((height/10 *2) * 1.41), ((height/10 * 8)-10), width/4 * 3, height -10);
    }
    else if (mode ==='landscape_mobile')
    {
      background(245, 247, 247);
      imageMode(CORNER);
      image(orchlabLogo, (width/2 - (((height/5)*2.63)/2)), 10, ((height/5)*2.63), height/5);
      fill('#212529');
      textSize(height/10);
      text("Percussion Box", width/2, height/10 * 3);
      textSize(height/18);
      text('To play: touch or click screen,', width/2, height/10 * 4);
      text('or use ZXCVBNM, keys on a keyboard', width/2, height/10 * 5);
      text('On Apple devices, turn off silent mode.', width/2, height/10 * 6);
      imageMode(CORNERS);
      image(lpoLogo, width/4, ((height/10 * 8)-10), width/4 + ((height/10 *2) * 1.95), height -10);
      image(dmLogo, width/4 * 3 - ((height/10 *2) * 1.41), ((height/10 * 8)-10), width/4 * 3, height -10);
    }
    else if ((mode === 'portrait_tablet') || (mode === 'portrait_mobile'))
    {
      background(245, 247, 247);
      imageMode(CORNER);
      image(orchlabLogo, (width/2 - (((picSize/2)*2.63)/2)), 10, ((picSize/2)*2.63), picSize/2);
      fill('#212529');
      textSize(width/10);
      text("Percussion Box", width/2, picSize);
      textSize(width/18);
      text('To play: ', width/2, picSize/4 * 6);
      text('touch or click screen,', width/2, picSize/4 * 7);
      text('or use QWERTYUI keys', width/2, picSize/4 * 8);
      text('on a keyboard', width/2, picSize/4 * 9);
      text('On Apple devices,', width/2, picSize/4 * 11);
      text('turn off silent mode', width/2, picSize/4 * 12);
      imageMode(CORNERS);
      image(lpoLogo, width/6, ((height/10 * 9)-10), width/6 + ((height/10) * 1.95), height-10);
      image(dmLogo, width/6 * 5 - ((height/10) * 1.41), ((height/10 * 9)-10), width/6 * 5, height-10);
    }
  }else{
    imageMode(CORNER);imageMode(CORNER);
    background("#AD71DD"); //orchlab green
    translate(translatePos1, translatePos2); // move x and y "home" based on the if/else loops above (remember this is cumalitive through this loop)

  for (var i = 0; i < NumberOfButtons; i++) { // this loop places the images and sizes them based on the if/else loops above
    image(imageFiles[i], imagePositionX[i], imagePositionY[i], picSize, picSize);
  }
  }

}

function mousePressed() {                 // this is a P5.js event listener. If the mouse is pressed and on one of the buttons, then the corrosponding file number is sent to my buttonPressed function
  for (var i = 0; i < NumberOfButtons; i++) {
    if ((mouseX > imagePositionX[i] + translatePos1) && (mouseX < imagePositionX[i] + translatePos1 + picSize) &&
        (mouseY > imagePositionY[i] + translatePos2) && (mouseY < imagePositionY[i] + translatePos2 + picSize)) {
          buttonPressed(i);
    }
  }
}

function touchStarted() {               // same as above but for touch. P5 manages touch/mouse conflicts etc which is nice
   //ellipse(touches[i].x ,touches[i].y, 250, 250);
  for (var i = 0; i < NumberOfButtons; i++) {
    for(let j = 0; j < touches.length; j++) {
      if ((touches[j].x > imagePositionX[i] + translatePos1) && (touches[j].x < imagePositionX[i] + translatePos1 + picSize) &&
          (touches[j].y > imagePositionY[i] + translatePos2) && (touches[j].y < imagePositionY[i] + translatePos2 + picSize)) {
            buttonPressed(i);
      }
    }
  }
  return false;
}

function keyTyped() {     // this listens for key presses on the ol' Qwerty
  switch(key) {
    case "z" :
      buttonPressed(0);
      break;
    case "Z" :
      buttonPressed(0);
      break;
    case "x" :
      buttonPressed(1);
      break;
    case "X" :
      buttonPressed(1);
      break;
    case "c" :
      buttonPressed(2);
      break;
    case "C" :
      buttonPressed(2);
      break;
    case "v" :
      buttonPressed(3);
      break;
    case "V" :
      buttonPressed(3);
      break;
    case "b" :
      buttonPressed(4);
      break;
    case "B" :
      buttonPressed(4);
      break;
    case "n" :
      buttonPressed(5);
      break;
    case "N" :
      buttonPressed(5);
      break;
    case "m" :
      buttonPressed(6);
      break;
    case "M" :
      buttonPressed(6);
      break;
    case "," :
      buttonPressed(7);
      break;
    case "<" :
      buttonPressed(7);
      break;
  }
}

function windowResized() {                    // p5 function that is called every time the window is resized - allows the site to respond to changing dimensions
  resizeCanvas(windowWidth, windowHeight);
}

function buttonPressed(track) {             // my function for playing files and setting the buttonstate. At present the images are linked to the onended command for p5sound which calls enndedTrack
  if(buttonState[track] === 1){
    imageFiles[track] = offImageFiles[track];
    let soundmap = [0,1,3,4];
    for(let i = 0; i < soundmap.length; i++){
      if(track === soundmap[i]){
        soundFiles[track].stop();
        return;
      }
    }
  }
  soundFiles[track].onended(endedTrack);
  milliseconds[track] = millis;
  soundFiles[track].play();
  buttonState[track] = 1;
  imageFiles[track] = onImageFiles[track];
  info = false;


}

var soundNames = ["assets/one.mp3", "assets/two.mp3", "assets/three.mp3", "assets/four.mp3", "assets/five.mp3", "assets/six.mp3", "assets/seven.mp3", "assets/eight.mp3"];

function endedTrack(i) {                     // when the file stops playing this is called and changes images and buttonState
  // console.log(`this is what i need = ${i}`);
  // console.log(JSON.stringify(i));
  // console.log(Object.keys(i));
  console.log(i.file);
  for(let j = 0; j < 8; j++){
    if(i.file === soundNames[j]){
      imageFiles[j] = offImageFiles[j];
      buttonState[j] = 0;
    }
  }
}

// function loadImageErrorOverride(errEvt) {
//   const pic = errEvt.target;

//   if (!pic.crossOrigin)  return print('Failed to reload ' + pic.src + '!');

//   print('Attempting to reload it as a tainted image now...');
//   pic.crossOrigin = null, pic.src = pic.src;
// }
