// Obstacle handler will contain the list of obstacles in the obstacles array
// RESPONSIBILITIES: 
// generating new obstacles
// updating the obstacles location
// deleting the obstacle if it goes off screen
// handling hit detection of player and obstacle
// increasing game difficulty over time

function obstacleHandler(scene, player, hitEffect) {
    var self = this;
    self.obstacles = [];
    self.coins = [];
    self.spawnChance = 2; // out of 100
    self.hitEffectTimer = 0;

    self.generate = function () { // adds obstacles - called in main update()
        var rndm = Math.random();
        if (rndm < self.spawnChance / 100) {
            self.obstacles.push(new Obstacle(scene));
        }
        if (rndm < (self.spawnChance/200))
        {
            self.coins.push(new Coin(scene));
        }
    };

    self.handleDifficulty = function () {   // increments spawn rate based on seconds passed in game

        if (self.spawnChance < 20) {
            if (Game.time % 10 === 0) {
                self.spawnChance = (Game.time / 6) + 3;
            }
        }

    };

    self.updateObstacles = function() {  // updates obstacles locations - called in main update()
        if (Game.gameState != "END") {
            for (var i = self.obstacles.length - 1; i >= 0; i--) { // have to loop backwards because deleting from array shifts array
                var obstacle = self.obstacles[i];

                if (obstacle.cube.position.z > 0 - player.zLength) {  // INFO: player is located at 0 on the Z axis
                    if (obstacle.xPos == player.xPos && obstacle.yPos == player.yPos && Game.gameState != "MENU" && Game.gameState != "PAUSED" && self.hitEffectTimer <= 0) { // player ran into a cube

                        Game.lives--;
                        hitEffect.style.display = "block";
                        self.hitEffectTimer = 100;

                        if (Game.lives == 0) {
                            Game.setGameState("END");
                            hitEffect.style.display = "none";
                            self.cleanObstacles();
                        }
                        scene.remove(obstacle.cube);
                        self.obstacles.splice(i, 1);
                    }
                }
                if (obstacle.cube.position.z > 0) {   //obstacle is off screen
                    scene.remove(obstacle.cube);
                    self.obstacles.splice(i, 1);
                }
                else {  // move obstacle
                    obstacle.updateLocation();
                }
            }


            for (var i = self.coins.length - 1; i >= 0; i--) { // have to loop backwards because deleting from array shifts array
                var currentCoin = self.coins[i];

                if (currentCoin.coin.position.z > 0 - player.zLength) {  // INFO: player is located at 0 on the Z axis
                    if (currentCoin.xPos == player.xPos && currentCoin.yPos == player.yPos) { // player ran into a cube

                        Game.coins++;

                        scene.remove(currentCoin.coin);
                        self.coins.splice(i, 1);
                    }
                }
                if (currentCoin.coin.position.z > 0) {   //obstacle is off screen
                    scene.remove(currentCoin.coin);
                    self.coins.splice(i, 1);
                }
                else {  // move obstacle
                    currentCoin.updateLocation();
                }
            }
        }

        if(self.hitEffectTimer > 0)
        {
            self.hitEffectTimer--;
            hitEffect.style.opacity = self.hitEffectTimer/100;
        }
        else
        {
            hitEffect.style.display = "none";
        }
    };

    // cleans obstacles and coins array on game over
    self.cleanObstacles = function() {
        for (var i = self.obstacles.length - 1; i >= 0; i--) {
            var obstacle = self.obstacles[i];
            scene.remove(obstacle.cube);
            self.obstacles.splice(i, 1);
        }
        for (var i = self.coins.length - 1; i >= 0; i--) {
            var currentCoin = self.coins[i];
            scene.remove(currentCoin.coin);
            self.coins.splice(i, 1);
        }
    }
}