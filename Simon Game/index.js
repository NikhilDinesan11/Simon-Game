var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ['red', 'blue', 'green', 'yellow'];

$('.btn').click(function() {
  var userChosenColour = $(this).attr('id');
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);

});

var start = false;
var level = 0;
$(document).keypress(function() {

  if (!start) {
    $('#level-title').text('Level ' + level);
    nextSequence();

    start = true;
  }

});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log('success');
    // to check if the sequence is complete then proceed to next sequence
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log('wrong');
    playSound('wrong');
    $('body').addClass('game-over');
    setTimeout(function() {
      $('body').removeClass('game-over')
    }, 200);
    $('h1').text('Game Over, Press Any Key to Restart');
    startOver();
  }

}
// to restart the game
function startOver() {
  level = 0;
  gamePattern = [];
  start = false;
}


function nextSequence() {
  userClickedPattern = [];
  level += 1;
  $('#level-title').text('level ' + level);
  var randomNumber = Math.ceil(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $('#' + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

}


function playSound(name) {
  var song = new Audio('sounds/' + name + '.mp3');
  song.play();
}

function animatePress(currentColor) {

  $('#' + currentColor).addClass('pressed');
  setTimeout(function() {
    $('#' + currentColor).removeClass('pressed');
  }, 100);
}
