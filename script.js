const log = (message) => console.log(message);

/* =========================
    GLOBAL SPELSTATE
========================= */
const game = {
    deck: [],
    players: {
        one: {
            hand: [],
            score: 0
        },
        two: {
            hand: [],
            score: 0
        }
    }
};

/* =========================
    START SPELET
========================= */
startGame();

function startGame() {
    createDeck();
    shuffleDeck(game.deck);
    dealCards();
    playRounds();
    announceWinner();
}

/* =========================
    KORTLEK
========================= */
function createDeck() {
    const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];

    for (const suit of suits) {
        for (let value = 2; value <= 14; value++) {
            game.deck.push(createCard(value, suit));
        }
    }
}

function createCard(value, suit) {
    return {
        value: value,
        name: getCardName(value, suit),
        suit: suit
    };
}

function getCardName(value, suit) {
    if (value <= 10) return `${value} of ${suit}`;
    if (value === 11) return `Jack of ${suit}`;
    if (value === 12) return `Queen of ${suit}`;
    if (value === 13) return `King of ${suit}`;
    return `Ace of ${suit}`;
}

/* =========================
    BLANDA KORT (Fisher-Yates)
========================= */
function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        const temp = deck[i];
        deck[i] = deck[randomIndex];
        deck[randomIndex] = temp;
    }
}

/* =========================
    DELA UT KORT
========================= */
function dealCards() {
    const CARDS_PER_PLAYER = 6;

    for (let i = 0; i < CARDS_PER_PLAYER; i++) {
        game.players.one.hand.push(game.deck.pop());
        game.players.two.hand.push(game.deck.pop());
    }    
}

/* =========================
    SPELA RUNDOR
========================= */
function playRounds() {
    sortHand(game.players.one.hand);
    sortHand(game.players.two.hand);

    console.log(game);
    

    const ROUNDS = game.players.one.hand.length;

    for (let i = 0; i < ROUNDS; i++) {
        playSingleRound();
    }
}

function playSingleRound() {
    const cardOne = game.players.one.hand.shift();
    const cardTwo = game.players.two.hand.shift();

    log(`${cardOne.name} vs ${cardTwo.name}`);

    if (cardOne.value > cardTwo.value) {
        game.players.one.score++;
        log('Player One wins the round!');
    } else if (cardOne.value < cardTwo.value) {
        game.players.two.score++;
        log('Player Two wins the round!');
    } else {
        resolveTie(cardOne, cardTwo);
    }
}

function resolveTie(cardOne, cardTwo) {
    if (cardOne.suit === 'Hearts') {
        game.players.one.score++;
        log('Tie! Hearts wins – Player One!');
    } else if (cardTwo.suit === 'Hearts') {
        game.players.two.score++;
        log('Tie! Hearts wins – Player Two!');
    } else {
        log('Tie! No points awarded.');
    }
}

/* =========================
    HJÄLPFUNKTIONER
========================= */
function sortHand(hand) {
    hand.sort((a, b) => b.value - a.value);
}

/* =========================
    RESULTAT
========================= */
function announceWinner() {
    const scoreOne = game.players.one.score;
    const scoreTwo = game.players.two.score;

    log('----------------');
    log(`Final Score: ${scoreOne} - ${scoreTwo}`);

    if (scoreOne > scoreTwo) {
        log('Player One wins the game!');
    } else if (scoreTwo > scoreOne) {
        log('Player Two wins the game!');
    } else {
        log("It's a draw!");
    }
}
