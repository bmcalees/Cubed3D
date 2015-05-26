//This code creates all of our cube obstacles and adds a material based on 
//row. The grid position is randomized. 

"use strict";

function Obstacle(scene) {
    var self = this;
	//randomize grid position
    self.xPos = Math.floor(Math.random() * 3);
    self.yPos = Math.floor(Math.random() * 3);
	
	//create cube geometry and load cube textures
	//need local server or host in order to fully see textures
    self.cubeGeo = new THREE.BoxGeometry(3, 3, 3);
    self.cube1Texture = THREE.ImageUtils.loadTexture('img/blockMat.png');
    self.cube2Texture = THREE.ImageUtils.loadTexture('img/blockMat2.png');
    self.cube3Texture = THREE.ImageUtils.loadTexture('img/blockMat3.png');
	
	//assign material based on row position
    self.cubeMat = undefined;
    if (self.xPos === 0) {
        self.cubeMat = new THREE.MeshLambertMaterial(
        {
           //map:self.cube1Texture
		   color: 0xcc00ff
        });
    } else if (self.xPos === 1) {
        self.cubeMat = new THREE.MeshLambertMaterial(
        {
            //map: self.cube2Texture
			color: 0x00ccff
        });
    } else if (self.xPos === 2) {
        self.cubeMat = new THREE.MeshLambertMaterial(
        {
            //map: self.cube3Texture
			color: 'orange'
        });
    }
    self.cube = new THREE.Mesh(self.cubeGeo, self.cubeMat);
    self.cube.castShadow = true;
    self.cube.position.x = currentGrid[self.xPos][self.yPos].x;
    self.cube.position.y = currentGrid[self.xPos][self.yPos].y;
    self.cube.position.z = -300;

    scene.add(self.cube);

    self.updateLocation = function(speed) {
        self.cube.position.z += speed;
    }
}