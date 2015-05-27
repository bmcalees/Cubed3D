//this code creates the coin the will be created within the obstacles, the position given to it is random 
//and and code for the shape was inspired from https://stemkoski.github.io/Three.js/Shapes.html

"use strict";

function Coin(scene) {
    var self = this;

    self.xPos = Math.floor(Math.random() * 3);
    self.yPos = Math.floor(Math.random() * 3);
	
    self.coinTexture = THREE.ImageUtils.loadTexture('img/coinMat.png');
	
    self.coinMat = new THREE.MeshLambertMaterial(
    {
        //map: self.coinTexture
        color: 'yellow',
        transparent: true,
        opacity: 0.7
    });

    self.coinG = new THREE.TorusGeometry(0.5, 0.5, 8, 4);
    // radius of entire torus, diameter of tube (less than total radius), 
    // segments around radius, segments around torus ("sides")
    self.coin = new THREE.Mesh(self.coinG, self.coinMat);
    self.coin.castShadow = true;
    self.coin.position.x = currentGrid[self.xPos][self.yPos].x;
    self.coin.position.y = currentGrid[self.xPos][self.yPos].y;
    self.coin.position.z = -300;

    scene.add(self.coin);

    self.updateLocation = function (speed) {
        self.coin.position.z += speed;
        self.coin.rotation.y += 0.04;
    }

}