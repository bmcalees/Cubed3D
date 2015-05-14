function Coin(scene) {
    var self = this;

    self.xPos = Math.floor(Math.random() * 3);
    self.yPos = Math.floor(Math.random() * 3);

    self.coinMat = new THREE.MeshLambertMaterial(
    {
        color: 0xCC9900
    });

    self.coinG = new THREE.TorusGeometry(1, 0.5, 8, 4);
    // radius of entire torus, diameter of tube (less than total radius), 
    // segments around radius, segments around torus ("sides")
    self.coin = new THREE.Mesh(self.coinG, self.coinMat);
    self.coin.castShadow = true;
    self.coin.position.x = currentGrid[self.xPos][self.yPos].x;
    self.coin.position.y = currentGrid[self.xPos][self.yPos].y;
    self.coin.position.z = -300;

    scene.add(self.coin);

    self.updateLocation = function () {
        self.coin.position.z += 1;
        self.coin.rotation.z += 0.02;
    }

}