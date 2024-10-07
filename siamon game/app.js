var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
var timeoutIDs = []; // Variable to store timeout IDs

// Detecting Start button click to start the game
$("#start-btn").click(function () {
    if (!started) {
        level = 1;
        $("h2").text("Level " + level);
        nextSequence(getBlinkCount(level)); // Start with the correct blink count
        started = true;
    }
});

// Detecting Quit button click to restart the game

$("#quit-btn").click(function () {
    // Clear all pending timeouts
    timeoutIDs.forEach(clearTimeout);
    timeoutIDs = [];
    
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
    $("h2").text("Press Start to Begin");
});

// Detecting button clicks
$(".btn-container div").click(function () {
    var userChosenColor = $(this).attr("id").replace("btn", "");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
});

// Function to check the user's answer
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                if (level < 5) {
                    level++;
                    $("h2").text("Level " + level);
                    nextSequence(getBlinkCount(level)); // Update blink count for the new level
                } else {
                    $("h2").text("Congratulations! You completed all levels!");
                }
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("h2").text("Game Over, Press Start to Restart");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        // startOver();
    }
}

// Function to generate the next sequence with custom blink count
function nextSequence(blinkCount) {
    userClickedPattern = [];
    gamePattern = [];
    for (var i = 0; i < blinkCount; i++) {
        var randomNumber = Math.floor(Math.random() * 4);
        var randomChosenColor = buttonColors[randomNumber];
        gamePattern.push(randomChosenColor);

        var timeoutID = setTimeout(function (color) {
            $("#" + "btn" + color)
                .fadeIn(100)
                .fadeOut(100)
                .fadeIn(100);
            playSound(color);
        }, i * 600, randomChosenColor); // Adjusting the blink interval

        // Store the timeout ID
        timeoutIDs.push(timeoutID);
    }
}

// Function to get the blink count based on level
function getBlinkCount(level) {
    if (level === 1) return 3;
    if (level === 2) return 5;
    if (level === 3) return 7;
    if (level === 4) return 9;
    if (level === 5) return 11;
    return 3; // Default to 3 if level is out of range
}

// Function to play the corresponding sound
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// Function to animate the button press
function animatePress(currentColor) {
    $("#" + "btn" + currentColor).addClass("pressed");

    setTimeout(function () {
        $("#" + "btn" + currentColor).removeClass("pressed");
    }, 100);
}

// Function to reset the game
function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
    $("h2").text("Press Start to Begin");
}
