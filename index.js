//variable declations

// const body = document.querySelector("body");
const video = document.querySelector(".video");
const video_play = document.querySelector(".fa-play");
const startingTime = document.querySelector(".starttimer");
const duration = document.querySelector(".endtimer");
const progressRange = document.querySelector(".progressRange");
const progressBar = document.querySelector(".progressBar");
const audioMute = document.querySelector("#vol-ctrls");
const speed = document.querySelector(".speed");
const largeScreen = document.querySelector(".fa-expand");
const player = document.querySelector(".player");
const frwd =document.querySelector(".fa-forward");
const rewind =document.querySelector(".fa-backward");



//event listerners
video.addEventListener("click", play);
video.addEventListener("ended", finishedVideo);
video_play.addEventListener("click", play);
video.addEventListener("timeupdate", updateProgressBar);
video.addEventListener("canplay", updateProgressBar);
progressRange.addEventListener("click", ProgressBarSet);
speed.addEventListener("change", playBackSpeed);
largeScreen.addEventListener("click", toggleFullscreen);
frwd.addEventListener("click",frwdVideo);
rewind.addEventListener("click",backWardVideo);

function finishedVideo() {
  if ((progressBar.style.width = `${100}%`)) {
    video_play.classList.replace("fa-pause", "fa-play");
    progressBar.style.width = `${0}%`;
    startingTime.textContent = "0:00";
  }
}

//play & pause functionality...
function play() {
  if (video.paused) {
    video.play();
    video_play.classList.replace("fa-play", "fa-pause");
    video_play.setAttribute("title", "pause");
  } else {
    video.pause();
    video_play.classList.replace("fa-pause", "fa-play");
    video_play.setAttribute("title", "play");
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
  let progBarChange = e.offsetX / progressRange.offsetWidth;
  progressBar.style.width = `${progBarChange * 100}%`;
  video.currentTime = progBarChange * video.duration;
}
// updateProgressbar();
function updateProgressBar() {
  progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
  startingTime.textContent = `${updateTimer(video.currentTime)}`;
  duration.textContent = `${updateTimer(video.duration)}`;
}

//forward speed rate
function playBackSpeed() {
  video.playbackRate = speed.value;
}

//fullscreen funcationality
let elem = document.documentElement;
function fullWindow(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
    largeScreen.classList.replace("fa-expand", "fa-compress");
    largeScreen.setAttribute("title", "Exit-Full-Screen");
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen();
  }
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
    largeScreen.classList.replace("fa-compress", "fa-expand");
    largeScreen.setAttribute("title", "Full-Screen");
  } else if (document.webkitRequestexitFullscreen) {
    document.webkitRequestexitFullscreen();
  } else if (document.msRequestexitFullscreen) {
    document.msRequestexitFullscreen();
  }
}

let fullscreen = false;
function toggleFullscreen() {
  if (!fullscreen) {
    fullWindow(player);
  } else {
    exitFullscreen();
  }
  fullscreen = !fullscreen;
}
//volume functionality
let volume = video.volume;
audioMute.addEventListener("click", () => {
  if (video.volume === 1) {
    video.volume = 0;
    audioMute.classList.replace("fa-volume-up", "fa-volume-down");
    audioMute.setAttribute("title", "mute");
  } else {
    video.volume = 1;
    audioMute.classList.replace("fa-volume-down", "fa-volume-up");
    audioMute.setAttribute("title", "volume-full");
  }
});
//loop functionality
let isInLoop = false;
let repeat = document.querySelector(".fa-redo");
repeat.addEventListener("click", () => {
  if ([...repeat.classList].includes("active")) {
    repeat.classList.remove("active");
    repeat.setAttribute("title", "repeat-mode-is-off");
    video.loop = false;
  } else {
    repeat.classList.add("active");
    repeat.setAttribute("title", "repeat-mode-is-on");
    video.loop = true;
  }
});

function frwdVideo(){
  video.currentTime = video.currentTime + 5;
}
function backWardVideo(){
  video.currentTime = video.currentTime - 5;
}

// function currentTimerVideo(){
//   progressRange.video.duration-
// }