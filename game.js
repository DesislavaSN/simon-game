var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameStarted = false;

$(document).keydown(function() {
  if (!gameStarted){
    nextSequence();
    gameStarted = true;
  }
})

$(".btn").click(function(event) {
  // var userChosenColour = event.target.id;
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
})

function checkAnswer(currentLevel){
  if ( gamePattern[currentLevel] === userClickedPattern[currentLevel] ){
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function(){
        nextSequence();
      },1000);
    }
    console.log("success");
  } else {
    console.log("wrong");
    $("body").addClass("game-over");
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  gameStarted = false;
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level "+level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound();
  // animatePress();
}


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed")
  }, 100);
}
