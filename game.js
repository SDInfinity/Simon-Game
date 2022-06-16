
var userClickedPattern = []; //whichever button one we are clicking
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = []; //whichever button is randomly generated //string array
var level = 0;
var started = false;                           //to toggle

$(document).keypress(function()               //the key press is to start the game first time
{
  if(!started)
  {
    $("#level-title").text("level "+level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {
  var userChosenColor = $(this).attr("id"); //stores current click
  userClickedPattern.push(userChosenColor); //current color
  playSound(userChosenColor);
  animateButton(userChosenColor);
  checkAnswer(userClickedPattern.length-1);                          //index of 'most recent' user's answer
});

function nextSequence() {


  userClickedPattern=[]                           //each time this function is called the sequence of colors for the user becomes empty
  level++;                                       //each time a new pattern is generated the level increases

$("#level-title").text("level "+level);         //the h1 gets updated as well


  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber]; //string storing any button within the array
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); //flash animation for required buttons generated randomly
  playSound(randomChosenColour);

}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animateButton(currentKey) //function for animantion and adding class pressed
{
  var activeButton = $("." + currentKey).addClass("pressed");
  setTimeout(function() {
    activeButton.removeClass("pressed");
  }, 100); //duration of 100 millisecond
}

function checkAnswer(currentLevel)
{
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel])  //checking user color with game pattern color at that point
  {
    if(userClickedPattern.length===gamePattern.length)             //checking for equality of array lenghts for each new sequence generated
    {
      setTimeout(function()
    {
      nextSequence();
    },1000);                                                        //if the conditions satisfy then nextSequence()is called after 1 second
    }
  }
  else                                                               //what happens if conditions are not satisfied
  {
    new Audio("sounds/wrong.mp3").play();
    $("h1").text("Game Over , Press Any Key To Restart");
    $("body").addClass("game-over");
    setTimeout(function()
  {
    $("body").removeClass("game-over");
  },200);
  startOver();
  }
}

function startOver()                                                  //reseting all the values
{
  level=0;
  gamePattern=[];
  started=false;                                                    //triggers another key press ---->goes to the else part of checkAnswer()
}
