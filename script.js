$('.update-button').on('click', setRange);
$('.submit-button').on('click', grabInputValues);
$('.winner-list').on('click', '.delete-button', deleteCard);
$('.clear-button').on('click', clearInputs);
winningNumber(1, 100);
/*add a clear function*/

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
  // displayGuess(firstPlayer, firstGuess, secondPlayer, secondGuess);
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
    showWinner(pOne, pTwo, timeClock, guessCount);
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
  }
    displayGuess(pOne, firstG, pTwo, secondG, feedbackOne, feedbackTwo);
}

function showWinner(winner, loser, time, guessCount) {
  $('.winner-list').append(`<article class="card"><article class="names"<p>${loser}</p><p>vs</p><p>${winner}</p></article><h2>${winner}</h2><h2>WINNER</2><p>guesses ${guessCount}</p><p>seconds ${time}</p><button class="delete-button">x</button></article>`)
  console.log(winner, time);
  increaseRange();
}

function increaseRange() {
  min -= 10;
  max += 10;
  winningNumber(min, max);
}

function deleteCard() {
  var parentArticle = $(this).closest('article');
  var id = parentArticle.prop('id');
  parentArticle.remove();
};

function clearInputs() {
  $('.player-one-name').val("").focus();
  $('.player-two-name').val("");
  $('.player-one-guess').val("");
  $('.player-two-guess').val("");
}