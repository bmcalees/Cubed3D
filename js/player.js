// This file contains the player cube creation (not seen on screen),
//keeps track of player position in the grid, and monitors keyboard
//events 
//Keyboard code is based off of Example code from 3DPong but includes 
//grid positioning from our code

"use strict";

function Player() {
    var self = this;
    self.xPos = 1;
    self.yPos = 1;

    self.xWidth = 3;
    self.yHeight = 3;
    self.zLength = 3;
	
	//create cube geometry and material
    self.cubeGeo = new THREE.BoxGeometry(self.xWidth, self.yHeight, self.zLength);
    self.cubeMat = new THREE.MeshLambertMaterial(
	{
	    color: 0x00ff00,
        transparent: true,
        opacity: 0
	});
    self.cube = new THREE.Mesh(self.cubeGeo, self.cubeMat);
    self.cube.position.x = currentGrid[self.xPos][self.yPos].x;
    self.cube.position.y = currentGrid[self.xPos][self.yPos].y;
   // self.cube.castShadow = true;

    // handle movement
    window.addEventListener('keydown', function (event) { keyDown(event); }, false);
    var hammertime = Hammer(document.body).on("swipe", function(event) {
        alert('hello!');
    });

    function updateLocation() {
        self.cube.position.x = currentGrid[self.xPos][self.yPos].x;
        self.cube.position.y = currentGrid[self.xPos][self.yPos].y;
    }

    function updateHUD() {

        $(".occupied").css("opacity", 0.3);
        $("#grid_"+self.xPos+"-"+self.yPos).css("opacity", 0.9);
    }

    function keyDown(event) {
        if (event.keyCode === 65 || event.keyCode === 37) { // Left
            if (self.yPos > 0) {
                self.yPos--;
            }
        }
        if (event.keyCode === 68 || event.keyCode === 39) { // Right
            if (self.yPos < 2) {
                self.yPos++;
            }
        }
        if (event.keyCode === 87 || event.keyCode === 38) { // Up
            if (self.xPos < 2) {
                self.xPos++;
            }
        }
        if (event.keyCode === 83 || event.keyCode === 40) { // Down
            if (self.xPos > 0) {
                self.xPos--;
            }
        }
        updateLocation();
        updateHUD();
    }
}