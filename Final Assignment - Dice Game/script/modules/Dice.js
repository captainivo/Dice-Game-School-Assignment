export default class Dice {
    constructor() {
        this.value = null;
    }

    
    roll() {
        return Math.floor(Math.random() * 6) + 1;
    }


}
