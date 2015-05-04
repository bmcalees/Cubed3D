function Obstacle(scene) {
    var self = this;
    self.xPos = Math.floor(Math.random() * 3);
    self.yPos = Math.floor(Math.random() * 3);

    self.cubeGeo = new THREE.BoxGeometry(3, 3, 3);
    self.cubeMat = undefined;
    if (self.xPos === 0) {
        self.cubeMat = new THREE.MeshLambertMaterial(
        {
            color: 0x0000ff
        });
    } else if (self.xPos === 1) {
        self.cubeMat = new THREE.MeshLambertMaterial(
        {
            color: 0x00ccff
        });
    } else if (self.xPos === 2) {
        self.cubeMat = new THREE.MeshLambertMaterial(
        {
            color: 0xcc00ff
        });
    }
    self.cube = new THREE.Mesh(self.cubeGeo, self.cubeMat);
    self.cube.castShadow = true;
    self.cube.position.x = currentGrid[self.xPos][self.yPos].x;
    self.cube.position.y = currentGrid[self.xPos][self.yPos].y;
    self.cube.position.z = -200;

    scene.add(self.cube);

    self.updateLocation = function() {
        self.cube.position.z += 1;
    }
}