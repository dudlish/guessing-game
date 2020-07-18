// Game Values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI Elements
const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play Again Event Listener
game.addEventListener('mousedown', function (e) {
    if (e.target.className === 'play-again') {
        window.location.reload();
    }
});

// Listen For Guess Btn
guessBtn.addEventListener('click', function () {
    let guess = parseInt(guessInput.value);
    // console.log(guess);

    // Validate Input
    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }

    // Check If Won
    if (guess === winningNum) {
        // Game Over WON
        gameOver(true, `${winningNum} is correct, YOU WIN!`);
    } else {
        // Wrong Number
        guessesLeft -= 1;
        if (guessesLeft === 0) {
            // Game Over LOST
            gameOver(false, `Game Over, you lost. The correct number was ${winningNum}.`);
        } else {
            // Game Continues; Answer Is Wrong
            // Change Border Color
            guessInput.style.borderColor = 'red';
            // Clear Input
            guessInput.value = '';
            // Tell User: wrong number
            setMessage(`${guess} is not correct. You have ${guessesLeft} guesses left.`, 'red');
        }
    }
});

// Set Message
function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}

// Game Over
function gameOver(won, msg) {
    let color;
    won === true ? color = 'green' : color = 'red';

    // Disable The Input
    guessInput.disabled = true;
    // Change Border Color
    guessInput.style.borderColor = color;
    // Set Message
    setMessage(msg, color);

    // Play Again?
    guessBtn.value = 'Play Again?';
    guessBtn.className += 'play-again';
    // The class is added after the page loaded, we need to use event delegation(add listener to a parent; search for a target-play again)
}

function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}