//variable declations

const video = document.querySelector(".video");
const video_play = document.querySelector(".fa-play");
const startingTime = document.querySelector(".starttimer");
const duration = document.querySelector(".endtimer");
const progressRange = document.querySelector(".progressRange");
const progressBar = document.querySelector(".progressBar");
// const audioMute = document.querySelector(".fa-volume-up");
const speed = document.querySelector(".speed");

const largeScreen = document.querySelector(".fa-expand");
const player = document.querySelector(".player");

// const backward = document.querySelector(".fa-backward");
// const forward = document.querySelector(".fa-forward");

//functionality

//play & pause functionality...
function play() {
  if (video.paused) {
    video.play();
    video_play.classList.replace("fa-play", "fa-pause");
  } else {
    video.pause();
    video_play.classList.replace("fa-pause", "fa-play");
  }
}

//duration time
function updateTimer(time) {
  const minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  seconds = seconds > 9 ? seconds : `0${seconds}`;
  return `${minutes}:${seconds}`;
}
//progressbar functionality seek
function ProgressBarSet(e) {
  const progBarChange = e.offsetX / progressRange.offsetWidth;
  progressBar.style.width = `${progBarChange * 100}%`;
  video.currentTime = progBarChange * video.duration;
}
// updateProgressbar();
function updateProgressBar() {
  progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
  startingTime.textContent = `${updateTimer(video.currentTime)}`;
  duration.textContent = `${updateTimer(video.duration)}`;
}
updateProgressBar();

//forward & backward
function playBackSpeed() {
  video.playbackRate = speed.value;
}

//fullscreen
let elem = document.documentElement;
function fullWindow(elem) {
  if(elem.requestFullscreen){
    elem.requestFullscreen();
    largeScreen.classList.replace("fa-expand","fa-compress");
  }else if (elem.webkitRequestFullscreen){
    elem.webkitRequestFullscreen();
  }else if(elem.msRequestFullscreen){
    elem.msRequestFullscreen();
  }
}
function exitFullscreen() {
  if(document.exitFullscreen){
    document.exitFullscreen();
    largeScreen.classList.replace("fa-compress","fa-expand");

  }else if (document.webkitRequestexitFullscreen){
    document.webkitRequestexitFullscreen();
  }else if(document.msRequestexitFullscreen){
    document.msRequestexitFullscreen();
  }
}

let fullscreen = false;
function toggleFullscreen(){
  if(!fullscreen){
    fullWindow(player);
  }else{
    exitFullscreen();
  }
  fullscreen = !fullscreen;
}


//event listerners
video.addEventListener("click", play);
video_play.addEventListener("click", play);
video.addEventListener("timeupdate", updateProgressBar);
video.addEventListener("canplay", updateProgressBar);
progressRange.addEventListener("click", ProgressBarSet);
speed.addEventListener("change", playBackSpeed);
largeScreen.addEventListener("click", toggleFullscreen);
// backward.addEventListener("click",backwardSpeed);
// forward.addEventListener("click",forwardSpeed);
// audioMute.addEventListener("click", volumeMute);
// function volumeMute(){
//   audioMute.classList.replace("fa-volume-up","fa-volume-down");
// }

