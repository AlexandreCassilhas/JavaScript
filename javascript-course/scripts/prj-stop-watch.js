
const hours = document.querySelector('.js-hours-label');
const minutes = document.querySelector('.js-minutes-label');
const seconds = document.querySelector('.js-seconds-label');
const miliseconds = document.querySelector('.js-miliseconds-label');

// Initializing counters.
let countHours = 0;
let countMinutes = 0;
let countSeconds = 0;
let countMiliseconds = 0;


const resetButton = document.querySelector('.js-reset-button');
resetButton.addEventListener('click', () => {
  resetStopWatch();
});



function resetStopWatch() {
  countHours = 0;
  countMinutes = 0;
  countSeconds = 0;
  countMiliseconds = 0;

  hours.innerHTML = '00';
  minutes.innerHTML = '00';
  seconds.innerHTML = '00';
  miliseconds.innerHTML = '000';
  
};

const startButton = document.querySelector('.js-start-button');
startButton.addEventListener('click', () => {
  startStopWatch();
});


function startStopWatch() {
  // Miliseconds processing.
  countMiliseconds = 0;
  const delay = 10;
  const maxCount = 100;
  let intervalId = setInterval(() => {
    miliseconds.innerHTML = countMiliseconds.toString().padStart(2, '0');
    countMiliseconds++;
    if (countMiliseconds >= maxCount) {
      // clearInterval(intervalId);
      countMiliseconds = 0;
      countSeconds++;
      seconds.innerHTML = countSeconds.toString().padStart(2, '0');
      if (countSeconds >= 60) {
        countSeconds = 0;
        countMinutes++;
        seconds.innerHTML = countSeconds.toString().padStart(2, '0');
        minutes.innerHTML = countMinutes.toString().padStart(2, '0');
        if (countMinutes >= 59) {
          countMinutes = 0;
          countHours++;
          seconds.innerHTML = countSeconds.toString().padStart(2, '0');
          minutes.innerHTML = countMinutes.toString().padStart(2, '0');
          hours.innerHTML = countHours.toString().padStart(2, '0');

        }
      }
    }
  }, delay);
};
