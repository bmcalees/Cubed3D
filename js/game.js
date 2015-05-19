var Game = {
    time : 0,
    coins: 0,
    lives: 3,
    previousState: "",
    gameState : "", // "MENU", "PLAYING", "END", "PAUSED"

    timerId : 0,

    setGameState: function (state) {  // To set a gamestate always go through this function to ensure dependent properties are handled
        if (state === "END") {
            if (this.timerId != 0)
                clearInterval(this.timerId);
        }
        if (state === "PLAYING") {
            this.timerId = setInterval(function () { this.time = this.time + 1; }.bind(this), 1000)
        }
        if (state === "PAUSED") {
            if(this.gameState === "PLAYING")
            {
                if (this.timerId != 0)
                    clearInterval(this.timerId);
            }
        }

        this.previousState = this.gameState;
        this.gameState = state;
    },
    reset: function () {
        this.time = 0;
        this.coins = 0;
        this.timerId = 0;
        this.lives = 3;
    }
}