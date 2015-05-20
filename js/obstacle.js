function Obstacle(scene) {
    var self = this;
    self.xPos = Math.floor(Math.random() * 3);
    self.yPos = Math.floor(Math.random() * 3);

    self.cubeGeo = new THREE.BoxGeometry(3, 3, 3);
    self.cube1Texture = THREE.ImageUtils.loadTexture('img/blockMat.png');
    self.cube2Texture = THREE.ImageUtils.loadTexture('img/blockMat2.png');
    self.cube3Texture = THREE.ImageUtils.loadTexture('img/blockMat3.png');
	
    self.cubeMat = undefined;
    if (self.xPos === 0) {
        self.cubeMat = new THREE.MeshLambertMaterial(
        {
           map:self.cube1Texture
        });
    } else if (self.xPos === 1) {
        self.cubeMat = new THREE.MeshLambertMaterial(
        {
            map: self.cube2Texture
        });
    } else if (self.xPos === 2) {
        self.cubeMat = new THREE.MeshLambertMaterial(
        {
            map: self.cube3Texture
        });
    }
    self.cube = new THREE.Mesh(self.cubeGeo, self.cubeMat);
    self.cube.castShadow = true;
    self.cube.position.x = currentGrid[self.xPos][self.yPos].x;
    self.cube.position.y = currentGrid[self.xPos][self.yPos].y;
    self.cube.position.z = -300;

    scene.add(self.cube);

    self.updateLocation = function() {
        self.cube.position.z += 1;
    }
}