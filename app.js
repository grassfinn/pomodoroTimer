// Helpfullinks
// https://stackoverflow.com/questions/4770025/how-to-disable-scrolling-temporarily

let minutes = 30;
let seconds = 0;
let breakMinutes = 10;
let timerSwitch = false;
let timerComplete = false;
let breakTimer = false;
let stop = false;

let points = 0;
let pointsCounter = document.getElementById('points');
const localStoragePoints = localStorage.setItem('points', points)

const timerTitle = document.getElementById('timer-title');
const buttonPress = new Audio('./sounds/button_press.mp3');

let pomodoroTimer;

// Buttons
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const settingsButton = document.getElementById('settings-open');
const settingsConfirmButton = document.getElementById('settings-confirm');
const text = document.getElementById('text');

// modal
settingsOverlay = document.getElementById('settings-overlay');
settingsModal = document.getElementById('settings-modal');
settingsClose = document.getElementById('settings-close');

// inputs
const timerMinutesInput = document.getElementById('timer-minutes');
const breakMinutesInput = document.getElementById('break-minutes');

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

settingsButton.addEventListener('click', () => {
  stopTime();
  settingsOverlay.classList.toggle('hide');
  document.querySelector('body').classList.toggle('stop-scrolling');
});

settingsConfirmButton.addEventListener('click', () => {
  if (timerMinutesInput.value < 1 || breakMinutesInput.value < 1) {
    settingsOverlay.classList.toggle('hide');
    document.querySelector('body').classList.toggle('stop-scrolling');

    return Math.floor(minutes) && Math.floor(breakMinutes);
  }

  breakMinutes = Math.floor(breakMinutesInput.value);
  minutes = Math.floor(timerMinutesInput.value);
  seconds = 0;
  settingsOverlay.classList.toggle('hide');
  document.querySelector('body').classList.toggle('stop-scrolling');

  render();
});

settingsClose.addEventListener('click', () => {
  settingsOverlay.classList.toggle('hide');
  document.querySelector('body').classList.toggle('stop-scrolling');
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
    text.textContent = 'Take a break.';
    timer.classList.remove('active');
    timer.classList.add('break');
    timerComplete = true;
    breakTimer = true;
    const wow = new Audio('sounds/wow.mp3');
    wow.play();
    minutes = breakMinutes;
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
    minutes = minutes;
    seconds = 0;
    points++;
    pointsCounter.textContent = `Points: ${points}`;
    localStorage.setItem('points', points)
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
