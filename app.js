let minutes = 30;
let seconds = 0;
let timerSwitch = false;
let timerComplete = false;
let breakTimer = false;
let stop = false;

let points = 0;
let pointsCounter = document.getElementById('points');

const timerTitle = document.getElementById('timer-title');
const buttonPress = new Audio('./sounds/button_press.mp3');

let pomodoroTimer;

const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const text = document.getElementById('text');

let timer = document.querySelector('#timer');
timer.innerHTML += `${minutes}:${seconds}`;

render();

// button functions

startButton.addEventListener('click', () => {
  if (timerSwitch === false) {
    start();
    pomodoroTimer = setInterval(function () {
      countdownMinutes();
      countdownSeconds();
      checkTimer();
      restTimer();
      resetTimer();
      render();
    }, 1000);
    return minutes && seconds;
  }
});

stopButton.addEventListener('click', () => {
  stopTime();
  timerTitle.textContent = `PAUSED - Pomodoro Timer`;
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
    minutes = 5;
    seconds = 0;
    return minutes && seconds;
  }
}

function resetTimer() {
  const work = new Audio('sounds/right_back.mp3');
  if (
    timerComplete === true &&
    breakTimer === true &&
    minutes <= 0 &&
    seconds <= 0
  ) {
    text.textContent = 'Get to work!';
    timer.classList.remove('break');
    timer.classList.add('active');
    breakTimer = false;
    timerComplete = false;
    minutes = 30;
    seconds = 0;
    points++;
    pointsCounter.textContent = `Points: ${points}`;
    work.play();

    return minutes && seconds && points;
  }
}

function start() {
  timerSwitch = true;
  timer.classList.remove('stop');
  timer.classList.add('active');
  text.textContent = 'Get to work!';
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
  timer.innerHTML = `${minutes}:${seconds}`;
  return minutes && seconds;
}

function render() {
  // leading zero
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  timer.innerHTML = `${minutes}:${seconds}`;
  timerTitle.textContent = `${minutes}:${seconds} - Pomodoro Timer`;
}
