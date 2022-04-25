let minutes = 30;
let seconds = 0;
let timerSwitch = false;
let timerComplete = false;
let breakTimer = false;
let stop = false;

let pomodoroTimer;

const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const text = document.getElementById('text');

let timer = document.querySelector('#timer');
timer.innerHTML += `${minutes}.${seconds}`;

startButton.addEventListener('click', () => {
    if (timerSwitch === false) {
        start();
        pomodoroTimer = setInterval(function () {
            countdownMinutes();
            countdownSeconds();
            checkTimer();
            restTimer();
            reset();
            render();
        }, 1000);
        return minutes && seconds;
    }
});

stopButton.addEventListener('click', () => {
  //   console.log('stop');
  stopTime();
  return minutes && seconds;
});

// Timer Functions

function countdownSeconds() {
  if (seconds > 0) {
    return seconds--;
  }
}

function countdownMinutes() {
  if (seconds <= 0 && minutes > 0) {
    minutes--;
    return (seconds = 60);
  }
}

function checkTimer() {
  if (minutes <= 0 && seconds <= 0 && timerComplete === false) {
    return (timerComplete = true);
  }
}
function restTimer() {
  if (timerComplete === true && breakTimer === false) {
    text.textContent = "Take a break. You've earned it!";
    timer.classList.remove('active');
    timer.classList.add('break');
    timerComplete = true;
    console.log(timerComplete);
    breakTimer = true;
    // console.log('go on break',breakTimer)
    const wow = new Audio('sounds/wow.mp3');
    wow.play();
    minutes = 10;
    seconds = 0;
    return minutes && seconds;
  }
}

function reset() {
  if (
    timerComplete === true &&
    breakTimer === true &&
    minutes <= 0 &&
    seconds <= 0
  ) {
    const work = new Audio('sounds/right_back.mp3');
    text.textContent = 'Get to work!';
    timer.classList.remove('break');
    timer.classList.add('active');
    breakTimer = false;
    timerComplete = false;
    minutes = 30;
    seconds = 0;
    work.play();
    return minutes && seconds;
  }
}

function stopTime() {
  timerSwitch = false;
  text.textContent = 'PAUSED';
  timer.classList.remove('active');
  timer.classList.remove('break');
  timer.classList.add('stop');
  // minutes = 0;
  // seconds = 5;
  clearInterval(pomodoroTimer);
  timer.innerHTML = `${minutes}.${seconds}`;
  return minutes && seconds;
}

function render() {
  timer.innerHTML = `${minutes}.${seconds}`;
}

function start() {
    timerSwitch = true;
    timer.classList.remove('stop');
    timer.classList.add('active');
    text.textContent = 'Get to work!';
  
}
