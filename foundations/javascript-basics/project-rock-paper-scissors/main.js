'use strict';

const CHOICES = ['Rock', 'Paper', 'Scissors'];
const ROUND_OUTCOMES = {'Won': 1, 'Lost': -1, 'Tied': 0};
const playerStats = {
    'player': {
        'node': document.getElementById('player-score'),
        'imgContainerNode': document.getElementById('player-result'),
        'score': 0,
    },
    'computer': {
        'node': document.getElementById('computer-score'),
        'imgContainerNode': document.getElementById('computer-result'),
        'score': 0,
    },
};
const resultsMsgNode = document.getElementById('results-msg');
const overlayNode = document.getElementById('overlay');
const finalMessageNode = document.getElementById('final-message');
const resultsImgDisplayNode = document.getElementById('results-img-display');
const roundNumberNode = document.getElementById('round-number');
let roundNumber;

/**
 * Return random choice for computer
 * @returns {String} Choice
 */
function computerPlay() {
    return CHOICES[Math.floor(Math.random() * 3)];
}

/**
 * Play single round of RPS with Player and Computer selection
 * @param {String} playerSelection 
 * @param {String} computerSelection 
 * @returns {Number|null} Number representing round outcome or null if argument is not valid
 */
function playRound(playerSelection, computerSelection) {
    // Update images
    updateResultImages(playerStats.player.imgContainerNode, playerSelection);
    updateResultImages(playerStats.computer.imgContainerNode, computerSelection);

    // Check for tie
    if (playerSelection === computerSelection) {
        resultsMsgNode.textContent = `You tied! Both selected ${computerSelection}`;
        return ROUND_OUTCOMES['Tied'];
    }
    // Determine if Player has won
    let hasPlayerWon = false;
    switch (playerSelection) {
        case 'Rock':
            if (computerSelection === 'Scissors')
                hasPlayerWon = true;
            break;
        case 'Paper': 
            if (computerSelection === 'Rock')
                hasPlayerWon = true;
            break;
        case 'Scissors': 
            if (computerSelection === 'Paper')
                hasPlayerWon = true;
            break;
        default:
            console.error(`${playerSelection} NOT valid!`);
            return null;
    }

    // Increment round number
    setRoundNumber(roundNumber + 1);

    // Return display message
    if (hasPlayerWon) {
        console.log(`You win! ${playerSelection} beats ${computerSelection}`); 
        resultsMsgNode.textContent = `You win! ${playerSelection} beats ${computerSelection}`;
        setPlayerScore(playerStats.player.score + 1);
        return ROUND_OUTCOMES['Won'];
    } else {
        console.log(`You lose! ${computerSelection} beats ${playerSelection}`);
        resultsMsgNode.textContent = `You lose! ${computerSelection} beats ${playerSelection}`;
        setComputerScore(playerStats.computer.score + 1);
        return ROUND_OUTCOMES['Lost'];
    }
}

/**
 * 
 * @param {Element} imgContainerNode Container element holding img elements for each selection 
 * @param {String} roundSelection Selection in which to display the corresponding img
 */
function updateResultImages(imgContainerNode, roundSelection) {
    imgContainerNode.querySelectorAll('img').forEach(img => {
        if (roundSelection && img.dataset.key === roundSelection)
            img.classList.remove('hide');
        else
            img.classList.add('hide');
    });
}

function checkForWinner() {
    // If Player is winner
    if (playerStats.player.score >= 5) {
        finalMessageNode.textContent = 'Congratulations! You Won!';
        overlayNode.classList.remove('loser');
        overlayNode.classList.add('winner');
    // Else If Computer is winner
    } else if (playerStats.computer.score >= 5) {
        finalMessageNode.textContent = 'Sorry. You Lost.';
        overlayNode.classList.remove('winner');
        overlayNode.classList.add('loser');
    } else { // Else no winner
        return;
    }
    overlayNode.classList.remove('hide');
}

function setRoundNumber(num) {
    if (num <= 0) return;

    roundNumber = num;
    roundNumberNode.textContent = `Round ${roundNumber}`;
}

function setParticipantScore(statObj, num) {
    if (num < 0) return;

    statObj.score = num;
    statObj.node.textContent = num;

    // Do NOT check for winner if score is reset to zero
    if (num)
        checkForWinner();
}

function setPlayerScore(num) {
    setParticipantScore(playerStats.player, num);
}

function setComputerScore(num) {
    setParticipantScore(playerStats.computer, num);
}

function resetGame() {
    // Hide overlay
    overlayNode.classList.add('hide');
    // Hide all result images
    updateResultImages(playerStats.player.imgContainerNode, 'Rock');
    updateResultImages(playerStats.computer.imgContainerNode, 'Rock');
    // Set round number to 1
    setRoundNumber(1);
    // Set scores to 0
    setPlayerScore(0);
    setComputerScore(0);
}

(function() {
    setRoundNumber(1);

    const choiceNodes = document.querySelectorAll('.choice');
    for (const choiceNode of choiceNodes) {
        choiceNode.addEventListener('click', e => {
            playRound(e.currentTarget.dataset.key, computerPlay());
        }, {
            capture: true,
        });
    }

    overlayNode.querySelector('button').addEventListener('click', resetGame);
})();