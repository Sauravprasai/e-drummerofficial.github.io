var classButton = document.querySelectorAll(".drum").length;
var volumeSlider = document.querySelector(".slider-tab input");
var KeysCheckbox = document.querySelector(".keys input");
var muteCheckbox = document.querySelector(".mute input");

var audio;

for (var i = 0; i < classButton; i++) {

  document.querySelectorAll(".drum")[i].addEventListener('click', function () {

    var buttonInnerHTML = this.innerHTML;

    makeSound(buttonInnerHTML);

    buttonAnimation(buttonInnerHTML);

  });

}

document.addEventListener("keypress", function(event) {

  makeSound(event.key);

  buttonAnimation(event.key);

});


function makeSound(key) {
  if (muteCheckbox.checked) {
    return; // If mute checkbox is checked, don't play the sound
  }
  switch (key) {
    case "w":
      audio = new Audio("sounds/tom-1.mp3");
      break;

    case "a":
      audio = new Audio("sounds/tom-2.mp3");
      break;

    case "s":
      audio = new Audio('sounds/tom-3.mp3');
      break;

    case "d":
      audio = new Audio('sounds/tom-4.mp3');
      break;

    case "j":
      audio = new Audio('sounds/snare.mp3');
      break;

    case "k":
      audio = new Audio('sounds/crash.mp3');
      break;

    case "l":
      audio = new Audio('sounds/kick-bass.mp3');
      break;

    default:
      console.log(key);
      return;
  }

  audio.volume = volumeSlider.value;
  audio.play();
}

function buttonAnimation(currentKey) {

  var activeButton = document.querySelector("." + currentKey);

  activeButton.classList.add("pressed");

  setTimeout(function() {
    activeButton.classList.remove("pressed");
  }, 100);

}

const handleVolume = (e) => {
  if (audio) {
    audio.volume = e.target.value;
  }
}

const showHideKeys = (e) => {
  const buttons = document.querySelectorAll(".drum");
  if (e.target.checked) {
    // If the checkbox is checked, hide the buttons
    buttons.forEach(button => {
      button.style.visibility = "visible";
    });
  } else {
    // If the checkbox is unchecked, show the buttons
    buttons.forEach(button => {
      button.style.visibility = "hidden";
    });
  }
}

const mutekeys = (e) => {
  const muteImage = document.querySelector(".mimage");
  if (!audio) {
    return; // If audio is not defined, don't do anything
  }
  if (e.target.checked) {
    audio.volume = 0;
    muteImage.style.visibility = "visible"; // Show the mute image
  } else {
    audio.volume = volumeSlider.value;
    muteImage.style.visibility = "hidden"; // Hide the mute image
  }
}


volumeSlider.addEventListener("input", handleVolume);
KeysCheckbox.addEventListener("click", showHideKeys);
muteCheckbox.addEventListener("click", mutekeys);

