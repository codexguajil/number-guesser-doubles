$(document).ready(populateWinners);
$('.update-button').on('click', setRange);
$('.submit-button').on('click', grabInputValues);
$('.clear-button').on('click', clearInputs);
winningNumber(1, 100);

function populateWinners(){
  for (var i = 0; i < localStorage.length; i++){
    var retrievedWinner = localStorage.getItem(localStorage.key(i));
    var parsedWinner = JSON.parse(retrievedWinner);
    showWinner(parsedWinner);
  }
}

$('.winner-list').on('click', '.delete-button', function(e){
  let storageId = $(this).parent().attr('id');
  localStorage.removeItem(storageId);
  $(this).parents('.card').remove();
})

var Winner = function (winner, loser, time, guesses) {
  this.winner = winner;
  this.loser = loser;
  this.id = Date.now();
  this.time = time;
  this.guesses = guesses;
};

function storeIdea (key, winnerCards){
  var stringifiedIdea = JSON.stringify(winnerCards);
  localStorage.setItem(key, stringifiedIdea);
  console.log('im working')
}

function setRange() {
  let minRange = $('.min-range').val();
  let maxRange = $('.max-range').val();
  updateRangeDisplay(minRange, maxRange);
  winningNumber(minRange, maxRange);
}

function winningNumber(minR, maxR) {
  min = parseInt(minR);
  max = parseInt(maxR);
  winValue = Math.floor(Math.random() * (max - min + 1)) + min ;
  console.log(winValue);
}

function updateRangeDisplay(min, max) {
  $('.min-range-display').html(min);
  $('.max-range-display').html(max);
}

let startTime;
let guessCount = 1;

function grabInputValues() {
  let firstPlayer = $('.player-one-name').val();
  let secondPlayer = $('.player-two-name').val();
  let firstGuess = $('.player-one-guess').val();
  let secondGuess = $('.player-two-guess').val();
  if (typeof startTime === 'undefined') {
    startTime = Date.now()
  }
  tellMeWinner(firstGuess, secondGuess, firstPlayer, secondPlayer, startTime);
}

function displayGuess(pOne, oneG, pTwo, twoG, feedbackOne, feedbackTwo) {
  $('.player-one-display-name').html(pOne);
  $('.player-two-display-name').html(pTwo);
  $('.player-one-display-guess').html(oneG);
  $('.player-two-display-guess').html(twoG);
  $('.feedback-one').html(feedbackOne);
  $('.feedback-two').html(feedbackTwo);
}

function tellMeWinner(firstG, secondG, pOne, pTwo, startTime) {
  console.log(startTime);
  let feedbackOne;
  let feedbackTwo;
  let guessFeedback = [
    "Too low!",
    "Too high!",
    "Boom!"
  ];
  if(firstG < winValue) {
    feedbackOne = guessFeedback[0];
    guessCount++;
  } else if (firstG > winValue) {
    feedbackOne = guessFeedback[1];
    guessCount++;
  } else {
    feedbackOne = guessFeedback[2];
    let timeElapsed = Date.now() - startTime;
    let timeClock = Math.floor(timeElapsed/1000);
    var winnerCard = new Winner(pOne, pTwo, timeClock, guessCount);
    showWinner(winnerCard);
    storeIdea(winnerCard.id, winnerCard);
    increaseRange();
  }
  if(secondG < winValue) {
    feedbackTwo = guessFeedback[0];
    guessCount;
  } else if (secondG > winValue) {
    feedbackTwo = guessFeedback[1];
    guessCount;
  } else {
    feedbackTwo = guessFeedback[2];
    let timeElapsed = Date.now() - startTime;
    let timeClock = Math.floor(timeElapsed/1000);
    showWinner(pTwo, pOne, timeClock, guessCount);
    increaseRange();
  }
    displayGuess(pOne, firstG, pTwo, secondG, feedbackOne, feedbackTwo);
}

function showWinner(winnerCard) {
  console.log(winnerCard.id)
  $('.winner-list').append(`
    <article class="card" id=${winnerCard.id}>
        <article class="names"> 
          <h3 class="player-one-display-name">${winnerCard.winner}</h3>
          <p>vs</p>
          <h3 class="player-two-display-name">${winnerCard.loser}</h3>
        </article>
        <h1 class="winner-name">${winnerCard.winner}</h1><h1 class="winner">WINNER</h1>
        <article class="guesses">
          <p class="number">${winnerCard.guesses}<span>GUESSES</span></p> 
          <p class="number">${winnerCard.time}<span>MINUTES</span></p>
        </article>
          <button class="delete-button">x</button>
    </article>`)
}

function increaseRange() {
  min -= 10;
  max += 10;
  winningNumber(min, max);
}

function clearInputs() {
  $('.player-one-name').val("").focus();
  $('.player-two-name').val("");
  $('.player-one-guess').val("");
  $('.player-two-guess').val("");
}