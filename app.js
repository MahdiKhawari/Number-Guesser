/* Game Function
-player must guess a number between a min and max
-player gets a certain amount of guesses
-notify player of guesses remaining
-notify the player of the correct answer if loose
-let player choose to play again
*/

//game values
let min = 1;
let max = 10;
let winningNum = getRandomNum({ max, min });
let guessesLeft = 3;

//UI Elements
const game = document.querySelector("#game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessBtn = document.querySelector("#guess-btn"),
  guessInput = document.querySelector("#guess-input"),
  message = document.querySelector(".message");

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//play again event listener
game.addEventListener("mousedown", (e) => {
  if (e.target.className === "play-again") {
    window.location.reload();
  }
});

//listen for guess
guessBtn.addEventListener("click", function () {
  let guess = parseInt(guessInput.value);

  //validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, "red");
  }

  //check if won
  if (guess === winningNum) {
    //  //Disable input
    //  guessInput.disabled = 'true';
    //  //change border color
    //  guessInput.style.borderColor = 'green';
    //  //set message
    //  setMessage(`${winningNum} is correct, You win`, 'green')
    gameOver(true, `${winningNum} is correct, You win`);
  } else {
    //wrong number
    guessesLeft -= 1;

    if (guessesLeft === 0) {
      //game over -lost
      gameOver(
        false,
        `Game over, you lost. the correct number was ${winningNum}`
      );

      //  //Disable input
      //  guessInput.disabled = "true";
      //  //change border color
      //  guessInput.style.borderColor = "red";
      //  //set message
      //  setMessage(`Game over, you lost. the correct number was ${winningNum}`, "red");
    } else {
      //game continues
      //change border color
      guessInput.style.borderColor = "red";

      //clear input
      guessInput.value = "";

      //tell user its the wrong number
      setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, "red");
    }
  }
});

function gameOver(won, msg) {
  let color;
  won === true ? (color = "green") : (color = "red");

  //Disable input
  guessInput.disabled = true;
  //change border color
  guessInput.style.borderColor = color;
  //set message
  setMessage(msg, color);

  //play again?
  guessBtn.value = "play again";
  guessBtn.className += "play-again";
}

//get winning number
function getRandomNum({ min, max }) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}
