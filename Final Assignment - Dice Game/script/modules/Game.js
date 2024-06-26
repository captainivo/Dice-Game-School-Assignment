import Dice from './Dice.js';

export default class Game {
    constructor() {
        this.playerScore = 0;
        this.computerScore = 0;
        this.round = 1;
        this.maxRounds = 3;
    }

    rollDice() {
        const die0 = new Dice();
        const die1 = new Dice();
        const die2 = new Dice();
        const die3 = new Dice();

        const die0Value = die0.roll();
        const die1Value = die1.roll();
        const die2Value = die2.roll();
        const die3Value = die3.roll();

        document.getElementById('die0').src = `images/dice-images/dice-six-faces-${die0Value}.png`;
        document.getElementById('die1').src = `images/dice-images/dice-six-faces-${die1Value}.png`;
        document.getElementById('die2').src = `images/dice-images/dice-six-faces-${die2Value}.png`;
        document.getElementById('die3').src = `images/dice-images/dice-six-faces-${die3Value}.png`;

        const diceState = {
            die0: die0Value,
            die1: die1Value,
            die2: die2Value,
            die3: die3Value
        };

        return diceState;
    }

    calculateScore(die1, die2) {
        if (die1 === 1 || die2 === 1) {
            return 0;
        } else if (die1 === die2) {
            return (die1 + die2) * 2;
        } else {
            return die1 + die2;
        }
    }

    updateScores(diceState) {
        const playerRoll = this.calculateScore(diceState.die0, diceState.die1);
        const computerRoll = this.calculateScore(diceState.die2, diceState.die3);

        document.getElementById('player-roll').textContent = `Roll: ${diceState.die0}, ${diceState.die1}`;
        document.getElementById('computer-roll').textContent = `Roll: ${diceState.die2}, ${diceState.die3}`;

        this.playerScore += playerRoll;
        this.computerScore += computerRoll;

        document.getElementById('player-score').textContent = `Round Score: ${playerRoll}`;
        document.getElementById('computer-score').textContent = `Round Score: ${computerRoll}`;
        document.getElementById('player-total-score').textContent = `Total Score: ${this.playerScore}`;
        document.getElementById('computer-total-score').textContent = `Total Score: ${this.computerScore}`;
    }

    nextRound() {
        if (this.round < this.maxRounds) {
            this.round++;
            document.getElementById('round-display').textContent = `Round: ${this.round}`;
        } else {
            document.getElementById('roll-button').classList.add('faded');

            this.determineWinner();
        }
    }

    determineWinner() {
        let winnerMessage = '';
        if (this.playerScore > this.computerScore) {
            winnerMessage = 'Player Wins!';
        } else if (this.playerScore < this.computerScore) {
            winnerMessage = 'Computer Wins!';
        } else {
            winnerMessage = "It's a Tie!";
        }
        document.getElementById('winner-message').textContent = winnerMessage;
    }

    resetGame() {
        this.playerScore = 0;
        this.computerScore = 0;
        this.round = 1;
        document.getElementById('round-display').textContent = `Round: ${this.round}`;
        document.getElementById('player-health').style.width = '0%';
        document.getElementById('computer-health').style.width = '0%';
        document.getElementById('player-roll').textContent = '';
        document.getElementById('computer-roll').textContent = '';
        document.getElementById('player-score').textContent = 'Round Score: 0';
        document.getElementById('computer-score').textContent = 'Round Score: 0';
        document.getElementById('player-total-score').textContent = 'Total Score: 0';
        document.getElementById('computer-total-score').textContent = 'Total Score: 0';
        document.getElementById('winner-message').textContent = '';
        document.getElementById('roll-button').classList.remove('faded');

    }

    run() {

        document.getElementById('roll-button').addEventListener('click', () => {
           
                const diceState = this.rollDice();
                this.updateScores(diceState);
                this.nextRound();
            
        });

        document.getElementById('reset-button').addEventListener('click', () => {
            this.resetGame();
        });



        
    }

}
