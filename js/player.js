function Player() {
    var self = this;
    self.xPos = 0;
    self.yPos = 0;

    self.cubeGeo = new THREE.BoxGeometry(3, 3, 3);
    self.cubeMat = new THREE.MeshLambertMaterial(
	{
	    color: 0x00ff00
	});
    self.cube = new THREE.Mesh(self.cubeGeo, self.cubeMat);
   // self.cube.castShadow = true;

    // handle movement
    window.addEventListener('keydown', function (event) { keyDown(event); }, false);

    function updateLocation() {
        self.cube.position.x = currentGrid[self.xPos][self.yPos].x;
        self.cube.position.y = currentGrid[self.xPos][self.yPos].y;
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
        updateLocation()
    }
}