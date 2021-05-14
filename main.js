// The Orchlab Percussion Box
// Code by Gawain Hewitt gawainhewitt.co.uk December 2020
// A project for Drake Music https://www.drakemusic.org/ for the Orchlab project https://orchlab.org/
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

var altImage1;        // these variables store the other images
var altImage2;
var altImage3;
var altImage4;
var altImage5;
var altImage6;
var altImage7;
var altImage8;


function preload() {                                  // p5.js function which preloads media into the browser
  sound1 = loadSound('sounds/one.mp3');
  sound2 = loadSound('sounds/two.mp3');
  sound3 = loadSound('sounds/three.mp3');
  sound4 = loadSound('sounds/four.mp3');
  sound5 = loadSound('sounds/five.mp3');
  sound6 = loadSound('sounds/six.mp3');
  sound7 = loadSound('sounds/seven.mp3');
  sound8 = loadSound('sounds/eight.mp3');

  image1 = loadImage('images/one.png');
  image2 = loadImage('images/two.png');
  image3 = loadImage('images/three.png');
  image4 = loadImage('images/four.png');
  image5 = loadImage('images/five.png');
  image6 = loadImage('images/six.png');
  image7 = loadImage('images/seven.png');
  image8 = loadImage('images/eight.png');

  altImage1 = loadImage('images/one_2.png');
  altImage2 = loadImage('images/two_2.png');
  altImage3 = loadImage('images/three_2.png');
  altImage4 = loadImage('images/four_2.png');
  altImage5 = loadImage('images/five_2.png');
  altImage6 = loadImage('images/six_2.png');
  altImage7 = loadImage('images/seven_2.png');
  altImage8 = loadImage('images/eight_2.png');

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
  textSize(width / 20); // how big the text is depending on which screen you are using
  textAlign(CENTER, CENTER); // where the text goes on the screen
}

function draw() {
  background(150, 180, 150);

  // for (var i = 0; i < NumberOfButtons; i++) {        // trying to improve the animation
  //     if ((millis - milliseconds[i]) > 1000) {
  //       if (buttonState[i] === 1) {
  //         imageFiles[i] = offImageFiles[i];
  //         buttonState[i] = 0;
  //     }
  //   }
  // }

  if (width < 500) { // test for portrait mobile
    mode  = 'portrait_mobile';
    picSize = height/4;
    textSize(width / 20);
    translatePos1 = width/2 - picSize;
    translatePos2 = 0;
    imagePositionX = [picSize * 0, picSize * 1, picSize * 0, picSize * 1, picSize * 0, picSize * 1, picSize * 0, picSize * 1];
    imagePositionY = [picSize * 0, picSize * 0, picSize * 1, picSize * 1, picSize * 2, picSize * 2, picSize * 3, picSize * 3];

  }
  else if (width < 1000 && height < 500) { // test for landscape mobile
    mode  = 'landscape_mobile';
    picSize = width/4;
    textSize(width / 20);
    translatePos1 = 0;
    translatePos2 = height/2 - picSize;
    imagePositionX = [picSize * 0, picSize * 1, picSize * 2, picSize * 3, picSize * 0, picSize * 1, picSize * 2, picSize * 3];
    imagePositionY = [picSize * 0, picSize * 0, picSize * 0, picSize * 0, picSize * 1, picSize * 1, picSize * 1, picSize * 1];

  }
  else if ((height < 1300 && height > 600) && (width < 1000 && width > 600)) { // test for landscape tablet
    mode  = 'portrait_tablet';
    picSize = height/4;
    textSize(width / 20);
    translatePos1 = width/2 - picSize;
    translatePos2 = 0;
    imagePositionX = [picSize * 0, picSize * 1, picSize * 0, picSize * 1, picSize * 0, picSize * 1, picSize * 0, picSize * 1];
    imagePositionY = [picSize * 0, picSize * 0, picSize * 1, picSize * 1, picSize * 2, picSize * 2, picSize * 3, picSize * 3];

  } else if ((width < 1300 && width > 600) && (height < 1000 && height > 600)) { // test for landscape tablet
    mode  = 'landscape_tablet';
    picSize = width/4;
    textSize(width / 20);
    translatePos1 = 0;
    translatePos2 = height/2 - picSize;
    imagePositionX = [picSize * 0, picSize * 1, picSize * 2, picSize * 3, picSize * 0, picSize * 1, picSize * 2, picSize * 3];
    imagePositionY = [picSize * 0, picSize * 0, picSize * 0, picSize * 0, picSize * 1, picSize * 1, picSize * 1, picSize * 1];

  } else {
    mode  = 'default';
    picSize = width/4;
    textSize(width / 20);
    translatePos1 = 0;
    translatePos2 = height/2 - picSize;
    imagePositionX = [picSize * 0, picSize * 1, picSize * 2, picSize * 3, picSize * 0, picSize * 1, picSize * 2, picSize * 3];
    imagePositionY = [picSize * 0, picSize * 0, picSize * 0, picSize * 0, picSize * 1, picSize * 1, picSize * 1, picSize * 1];
  }

  // text(mode, 10, 30); displays which mode it detects for debugging

  translate(translatePos1, translatePos2); // move x and y "home" based on the if/else loops above (remember this is cumalitive through this loop)

  for (var i = 0; i < NumberOfButtons; i++) { // this loop places the images and sizes them based on the if/else loops above
    image(imageFiles[i], imagePositionX[i], imagePositionY[i], picSize, picSize);
  }

// this next bit controls the info screen - also remember that translate is cumalative!
  if (info) {
    if ((mode ==='landscape_tablet') || (mode ==='default')) {
      fill(255, 200, 255, 200);
      rect(0, 0, picSize * 4, picSize * 2);
      fill(0);
      text('The Orchlab Percussion Box', picSize * 2, picSize/2);
      text('Use the letters QWERTYUI to play', picSize * 2, picSize);
      text('Or touch the screen', picSize * 2, picSize/4 * 5);
    }
    else if (mode ==='landscape_mobile')
    {
      fill(255, 200, 255, 200);
      rect(0, 0, picSize * 4, picSize * 2);
      fill(0);
      text('The Orchlab Percussion Box', picSize * 2, picSize/2);
      text('Touch the screen to play', picSize * 2, picSize);
    }
    else if ((mode === 'portrait_tablet') || (mode === 'portrait_mobile'))
    {
      fill(255, 200, 255, 200);
      rect(0, 0, picSize * 2, picSize * 4);
      fill(0);
      text('The Orchlab', picSize, picSize);
      text('Percussion Box', picSize, picSize/4 * 5);
      text('Touch the screen', picSize, picSize * 2);
      text('to play', picSize, picSize/4 * 9);
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
}

function keyTyped() {     // this listens for key presses on the ol' Qwerty
  switch(key) {
    case "q" :
      buttonPressed(0);
      break;
    case "Q" :
      buttonPressed(0);
      break;
    case "w" :
      buttonPressed(1);
      break;
    case "W" :
      buttonPressed(1);
      break;
    case "e" :
      buttonPressed(2);
      break;
    case "E" :
      buttonPressed(2);
      break;
    case "r" :
      buttonPressed(3);
      break;
    case "R" :
      buttonPressed(3);
      break;
    case "t" :
      buttonPressed(4);
      break;
    case "T" :
      buttonPressed(4);
      break;
    case "y" :
      buttonPressed(5);
      break;
    case "Y" :
      buttonPressed(5);
      break;
    case "u" :
      buttonPressed(6);
      break;
    case "U" :
      buttonPressed(6);
      break;
    case "i" :
      buttonPressed(7);
      break;
    case "I" :
      buttonPressed(7);
      break;
  }
}

function windowResized() {                    // p5 function that is called every time the window is resized - allows the site to respond to changing dimensions
  resizeCanvas(windowWidth, windowHeight);
}

function buttonPressed(track) {             // my function for playing files and setting the buttonstate. At present the images are linked to the onended command for p5sound which calls enndedTrack
  soundFiles[track].onended(endedTrack);
  milliseconds[track] = millis;
  soundFiles[track].play();
  buttonState[track] = 1;
  imageFiles[track] = onImageFiles[track];
  info = false;
}

function endedTrack() {                     // when the file stops playing this is called and changes images and buttonState
  for (var i = 0; i < NumberOfButtons; i++) {
    if (buttonState[i] === 1) {
      imageFiles[i] = offImageFiles[i];
      buttonState[i] = 0;
    }
  }

}

// function loadImageErrorOverride(errEvt) {
//   const pic = errEvt.target;

//   if (!pic.crossOrigin)  return print('Failed to reload ' + pic.src + '!');

//   print('Attempting to reload it as a tainted image now...');
//   pic.crossOrigin = null, pic.src = pic.src;
// }
