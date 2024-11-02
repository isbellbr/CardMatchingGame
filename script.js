// These are all the symbols that the game is going to use
const symbols = ['🍎', '🍌', '🍇', '🍓', '🍍', '🍉', '🍒', '🥝'];
// You're going to need this to display the cards on the screen (remember there should be two of each card)
let cards = [];
// These will be used when the user starts choosing cards
let firstCard = null, secondCard = null;
// You will need to lock the board to stop users from choosing cards when they choose two wrong cards
// (Don't have to worry about this too much)
let lockBoard = false;

/* 
    You must initialize the game board. You have been given a shuffleArray() function.
    This function should also reset the entire game board by making sure there's no HTML inside of the game-board div.
    Use the createCard() function to initialize each cardElement and add it to the gameBoard.

*/
gameBoard = document.getElementById("game-board");

function initGame() {
    // Write your code here
    shuffleArray(symbols);
    for (let sym of symbols) {
        cards.push(createCard(sym));
        cards.push(createCard(sym));
    }
    shuffleArray(cards);
    for (let card of cards) {
        gameBoard.appendChild(card);
    }
    createTimer();
}

function createTimer() {
    // Get the HTML element where you want to display the timer
    const timerElement = document.getElementById("timer");

    // Set the initial time in seconds
    let timeRemaining = 60; 

    // Update the timer every second
    const timerInterval = setInterval(() => {
    // Display the time remaining
    timerElement.textContent = `Time remaining: ${timeRemaining} seconds`;

    // Decrement the time remaining
    timeRemaining--;

    // Stop the timer when it reaches 0
    if (timeRemaining < 0) {
        clearInterval(timerInterval);
        timerElement.textContent = "Time's up!";
        setTimeout(() => {
            restartGame();
        }, 500);

    }
    }, 1000); // 1000 milliseconds = 1 second
}


/*
    The card will have the class 'card' and it would be a good idea to somehow save what its symbol is
    within the element itself, since we'll need it for later and there's no easy way to get it from the arrays.
    Also make sure to add the event listener with the 'flipCard' function
*/
function createCard(symbol) {
    let card = document.createElement('div');
    card.classList.add('card');
    let sym = symbol;
    card.dataset.sym = sym;
    card.addEventListener("click", ()=> flipCard(card));
    return card;
}

/*
    This function will handle all the logic for flipping the card. You can check if a variable doesn't
    have a value attached to it or is null by doing if (variable === null) {} or if (variable == null) {} or  if (!variable){}
    If a card get's flipped, add the 'flipped' class and also display the symbol. 
    Also, if this is the first card you picked, then set the firstCard variable to the card you just picked.
    If it's the second, then set the secondCard variable to it. Also, if that's the second card, then you 
    want to check for a match using the checkForMatch() function. 
*/
function flipCard(card) {
    // If the board is supposed to be locked or you picked the same card you already picked
    if (lockBoard || card === firstCard) return;
    if (firstCard == null) {
        card.classList.add('flipped');
        card.textContent = card.dataset.sym;
        firstCard = card;
    }
    else {
        card.classList.add('flipped');
        card.textContent = card.dataset.sym;
        secondCard = card;
        checkForMatch();
    }
}

/* 
    If there's a match between the first two cards that you picked, you want to take those cards out of the
    game and then reset the board so that there is firstCard == null and secondCard == null.
    Otherwise, you should unflip the card and continue playing normally.
*/
function checkForMatch() {
    if (firstCard.dataset.sym === secondCard.dataset.sym) {
        disableCards();
        resetBoard();
    }
    else {
        unflipCards();
    }
}

/* 
    Disable both of the cards by adding the "matched" class to them. The "matched" class will add CSS
    properties to make sure that they can no longer be clicked at all. Then use the resetBoard() function
    to reset the firstCard, secondCard, and lockBoard variables. (That's been written for you already)
*/
function disableCards() {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
}

function unflipCards() {

    // We lock the board so that the user can't touch the board while it is unflipping
    lockBoard = true;

    // The cards will be flipped back after 1 second and the board will be reset
    // The 1 second is to give the user time to actually see the card so they can memorize them before they unflip
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.textContent = '';
        secondCard.textContent = '';
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

// Function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

initGame();

function restartGame() {
    // resetBoard();
    // gameBoard.innerHTML = "";
    // cards = [];
    // initGame();
    location.reload();
}

restart_button = document.getElementById("restart-btn");
restart_button.addEventListener("click", restartGame);