const levelNumb = document.querySelector('#level-numb');
const healthCount = document.querySelector('#health-count');
const playerName = document.querySelector('#player-name');
const scoreCount = document.querySelector('#score-count');
const botButton = document.querySelector('#bot-button');

export class Status{
    constructor({level, health, player, score}) {
        this.level = level;
        this.health = health;
        this.player = player;
        this._score = score;

        botButton.addEventListener('click', () => {
            botButton.blur()
            if(this.isBotOn) {
                this.isBotOn = false
                botButton.textContent = 'Auto game off'
            }
            else {
                this.isBotOn = true
                botButton.textContent = 'Auto game on'
            }
        });
    };

    isBotOn = false;

    set score(value) {
        this._score = value;
        if (this._score < 0)
        this._score = 0;
    }

    get score() {
        return this._score;
    }

    loseHealth() {
        this.health - 1;
    };

    changeLevel(levelNumb) {
        this.level = levelNumb;
    }

    changePlayer(newPlayer) {
        this.player = newPlayer;
    }

    increaseScore(points) {
        this.score += points;
    }

    decreaseScore(points) {
        this.score -= points;
    }

    updateStatus() {
        // console.log(this.score);
        levelNumb.innerHTML = this.level + 1; 
        healthCount.innerHTML = '❤ '.repeat(this.health);
        playerName.innerHTML = this.player;
        scoreCount.innerHTML = this.score;
    }
}