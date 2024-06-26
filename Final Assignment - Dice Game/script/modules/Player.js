import Dice from "./Dice.js";

const diceImage0 = document.getElementById('die0');
const diceImage1 = document.getElementById('die1');
const diceImage2 = document.getElementById('die2');
const diceImage3 = document.getElementById('die3');


let diceState = Math.floor(Math.random() * 6);

export default class Player {
    constructor(name) {
        this.name = name;
        this.dice = [new Dice(), new Dice()];
        this.scores = [];

    }

    rollDice() {
        const values = this.dice.map(die => die.roll());

        this.dice.forEach(die => {
            animateDice();
        });



        function animateDice(die) {
            const frameRate = 5; 
            const duration = 5000;
            const interval = 1000 / frameRate;
            let startTime = Date.now();

            function updateDice() {
                const elapsed = Date.now() - startTime;

                if (elapsed < duration) {
                    if (diceState <= 6) {
                        diceImage.src = `./images/dice-images/dice-six-faces-${diceState}.png`;
                        diceState++;
                    } else {
                        diceState = 1;
                    }

                    setTimeout(updateDice, interval);
                }

            }

            updateDice();

        }
        console.log(this.dice[0]);
        diceImage.src = `./images/dice-images/dice-six-faces-${diceState}.png`;

        this.scores.push(this.calculateScore(values));
        return values;
    }


    calculateScore(values) {
        if (values.includes(1)) {
            return 0;
        } else if (values[0] === values[1]) {
            return (values[0] + values[1]) * 2;
        } else {
            return values[0] + values[1];
        }
    }

    getTotalScore() {
        return this.scores.reduce((total, score) => total + score, 0);
    }

    reset() {
        this.scores = [];
    }
}
