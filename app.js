
let minutes = 0;
let seconds = 5;
let timerComplete = false;
let breakTimer = false;
let stop = false;

let pomodoroTimer;

const startButton = document.getElementById('start')
const stopButton = document.getElementById('stop')
const text = document.getElementById('text')

let timer = document.querySelector('#timer')
timer.innerHTML += `${minutes}.${seconds}`


startButton.addEventListener('click', () =>{
    timer.classList.remove('stop')
    timer.classList.add('active')
    text.textContent = 'Get to work BOI!'
    pomodoroTimer = setInterval(function (){
        countdownMinutes()
        countdownSeconds()
        checkTimer();
        restTimer();
        reset();
        timer.innerHTML = `${minutes}.${seconds}`;
    },1000)
})

stopButton.addEventListener('click',() =>{
    text.textContent = 'WIMP!'

    timer.classList.remove('active')
    timer.classList.remove('break')
    timer.classList.add('stop')
    console.log('stop')
    stopTime()
    timer.innerHTML = `${minutes}.${seconds}`    
})

// Timer Functions

function countdownSeconds() {
    if (seconds > 0) { 
        seconds--;
    }
}

function countdownMinutes() {
    if (seconds <= 0 && minutes > 0 ) {
        minutes--;
        seconds = 60;
    }
}

function checkTimer() {

    if (minutes <= 0 && seconds <= 0 && timerComplete === false) {
        timerComplete = true;
        console.log('complete');
        console.log('timer is complete',timerComplete)
    }
}
function restTimer() {
    if (timerComplete === true && breakTimer === false) {
        text.textContent = 'take a break big BOI!'
        timer.classList.remove('active')
        timer.classList.add('break')
        timerComplete = true;
        console.log(timerComplete)
        breakTimer = true;
        // console.log('go on break',breakTimer)
        const wow = new Audio('./sounds/wow.MP3');
        wow.play();
        minutes = 5;
        seconds = 0;
        
    }
}

function breakCountdown() {
    if (breakTimer === true) {
    }
}

function reset() {
    if (timerComplete === true && breakTimer === true && minutes <= 0 && seconds <= 0)
    {
        text.textContent = 'Get to work BOI!'
        timer.classList.remove('break')
        timer.classList.add('active')
        breakTimer = false;
        timerComplete = false;
        const bell = new Audio('./sounds/bell.WAV')
        minutes = 30;
        seconds = 0;
        const work = new Audio('./sounds/meme.MP3')
        work.play()
    }
}

function stopTime() {
    // minutes = 0;
    // seconds = 5;
    clearInterval(pomodoroTimer)
}