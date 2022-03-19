window.addEventListener('load', init);

// globals

// available Levels
const levels = {
  easy: 5,
  medium: 3,
  hard: 1
};

// to change level
const currentLevel = levels.easy;

let time = currentLevel;
let score = 0;
let isPlaying;

// DOM elements
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');
const highscoreDisplay = document.querySelector('#highscore');

const words = [
'vivid',
'around you',
'let me in',
'the carol',
'kiss later',
'my sunday',
'my melody',
'into the new heart',
'love and live',
'you and me together',
'fairy tale',
'valentine girl',
'everyday i love you',
'everyday i need you',
'love and evil',
'sonatine',
'rain 51db',
'eclipse',
'twilight',
'singing in the rain',
'love letter',
'love cherry motion',
'puzzle',
'odd',
'girl front',
'loonatic',
'chaotic',
'starlight',
'add',
'sweet crazy love',
'uncover',
'odd front',
'new',
'd-1',
'the carol 2.0',
'heart attack',
'girls talk',
'one and only',
'see saw',
'egoist',
'rosy',
'dal segno',
'love4eva',
'frozen',
'one way',
'rendezvous 18.6y',
'favOriTe',
'hi high',
'heat',
'perfect love',
'stylish',
'xx',
'butterfly',
'satellite',
'curiosity',
'colors',
'where you at',
'365',
'so what',
'number 1',
'oh yes i am',
'ding dong dong',
'day and night',
'why not?',
'voice',
'fall again',
'universe',
'hide and seek',
'oops!',
'star',
'paint the town',
'WOW',
'be honest',
'dance on my own',
'a different night',
'U R',
'hulahoop',
'starseed',
'playback',
];

// initialize Game
function init() {
  // show number of seconds in UI
  seconds.innerHTML = currentLevel;
  // load word from array
  showWord(words);
  // start matching on word input
  wordInput.addEventListener('input', startMatch);
  // call countdown every second
  setInterval(countdown, 1000);
  // check game status
  setInterval(checkStatus, 50);
}

// start match
function startMatch() {
  if (matchWords()) {
    isPlaying = true;
    time = currentLevel + 1;
    showWord(words);
    wordInput.value = '';
    score++;
  }
  
  // highscore based on score value for sessionstorage
  if (typeof sessionStorage['highscore'] === 'undefined' || score > sessionStorage['highscore']) {
    sessionStorage['highscore'] = score;
  } else {
    sessionStorage['highscore'] = sessionStorage['highscore'];
  }

  // prevent display of high Score: -1
  if (sessionStorage['highscore'] >= 0) {
  highscoreDisplay.innerHTML = sessionStorage['highscore'];
  }

  // if score is -1, display 0
  if (score === -1) {
    scoreDisplay.innerHTML = 0;
  } else {
    scoreDisplay.innerHTML = score;
  }
}

// match currentWord to wordInput
function matchWords() {
  if (wordInput.value === currentWord.innerHTML) {
    message.innerHTML = 'Correct!!!';
    return true;
  } else {
    message.innerHTML = '';
    return false;
  }
}

// pick & show random word
function showWord(words) {
  // generate random array index
  const randIndex = Math.floor(Math.random() * words.length);
  // output random word
  currentWord.innerHTML = words[randIndex];
}

// countdown 
function countdown() {
  // make sure time doesnt run out
  if (time > 0) {
    // thing
    time--;
  } else if (time === 0) {
    // game over
    isPlaying = false;
  }
  // show time
  timeDisplay.innerHTML = time;
}

// check game status
function checkStatus() {
  if (!isPlaying && time === 0) {
    message.innerHTML = 'Game Over!!!';
    score = -1;
  }
}