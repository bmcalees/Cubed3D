//game object holds all necessary information regarding the game elements including the timer, score, lives, and coins
//It also includes game state changes to effectively change from the start to end screen during play.

var Game = {
    time : 0,
    coins: 0,
    lives: 3,
    previousState: "",
    gameState : "", // "MENU", "PLAYING", "END", "PAUSED"
    timerId : 0,
	
	//utilizes game states to shift from start, playing , to end
    setGameState: function (state) {  // To set a gamestate always go through this function to ensure dependent properties are handled
        if(this.gameState === "MENU" && state != "MENU") {
            $('.menu').hide();
        }
        if(this.gameState === "END" && state != "END") {
            $('.end').hide();
            if(state != "MENU"){
                $("#startBtn").hide();
            }
        }
        if(state == "MENU") {
            $('.menu').show();
        }
        if (state === "END") {
            if (this.timerId != 0)
                clearInterval(this.timerId);
            $("#startBtn").show();
            // do end of game score calculation
            $(".end").show();
            var score = Math.round((this.time / 4) * this.coins);
            $("#score")[0].innerHTML = score.toString();

            backgroundAudio.currentTime = 0;
            backgroundAudio.pause();
        }
        if (state === "PLAYING") {
            $(".end").hide();
            this.timerId = setInterval(function () { this.time = this.time + 1; }.bind(this), 1000);
            backgroundAudio.volume = 0.3;
            backgroundAudio.play();
        }
        if (state === "PAUSED") {
            $("#filter").show();
            if(this.gameState === "PLAYING")
            {
                backgroundAudio.pause();
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

        backgroundAudio.currentTime = 0;
        backgroundAudio.pause();
    }
}