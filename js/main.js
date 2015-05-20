"use strict";
(function(){
    // SCOPE CONSTANTS

    //bug where screen is moving with arrow keys if windowed
    var GAME = Object.freeze({
        width: window.innerWidth,
        height: window.innerHeight
    });

    var CAMERA = Object.freeze({
        viewAngle: 60,
        aspect: GAME.width / GAME.height,
        near: 0.1,
        far: 10000
    });

    // SCOPE VARIABLES
    var MATERIAL = Object.seal({
        cubeMaterial1: undefined,
        cubeMaterial2: undefined,
        cubeMaterial3: undefined,
        playerMaterial: undefined,
        planeMaterial: undefined,
        collectableMaterial: undefined
    });

    // scene graph variables
    var canvas, ctx;
    var renderer, scene, camera, pointLight, spotLight;
    var powerUp, mirrorCubeCamera, plane, planeLeft, planeRight, planeTop;
    var lines = [], xPosArray = [-15, 28, -15, 28, -12, 25, ], lineTimer = 0;

    var player = new Player(0, 0);
    var obstacleHndlr = undefined;

    // html tag references
    var livesTag, coinTag, timeTag, hitEffect;

    //2D array veriable
    var currentGrid = [];

    function setup(){

        // create a WebGL renderer
        var div = document.getElementById("gameDiv");
        livesTag = document.getElementById("lives");
        coinTag = document.getElementById("coins");
        timeTag = document.getElementById("time");
        hitEffect = document.getElementById("onHit");

        renderer = new THREE.WebGLRenderer();
        renderer.setSize(GAME.width, GAME.height);
        div.appendChild(renderer.domElement);

        window.onblur = function() {
            Game.setGameState("PAUSED");
        };
        window.onfocus = function() {
            Game.setGameState(Game.previousState);
        };

        // create scene and set up all the 3D objects in the scene
        scene = new THREE.Scene();
        createMaterials();
        createCamera();
        createModels();
        createLights();

        // automatically resize renderer
        THREEx.WindowResize(renderer, camera);
        // toggle full-screen on given key press
        THREEx.FullScreen.bindKey({ charCode: 'f'.charCodeAt(0) });

        //create new obstacle handler
        obstacleHndlr = new obstacleHandler(scene, player, hitEffect);

        // set starting game state
        Game.setGameState("MENU");
        document.getElementById("startBtn").addEventListener("click", function() {
            Game.reset();
            Game.setGameState("PLAYING");
            obstacleHndlr.cleanObstacles();
            obstacleHndlr = new obstacleHandler(scene, player, hitEffect);
        });

        // get started!
        update();
    }

    function createMaterials(){
        //temp plane material
        MATERIAL.planeMaterial = new THREE.MeshLambertMaterial(
            {
                color: 0xFFFFFF
            });
    }

    function createCamera(){
        camera = new THREE.PerspectiveCamera(
            CAMERA.viewAngle,
            CAMERA.aspect,
            CAMERA.near,
            CAMERA.far
        );

        scene.add(camera);

        //change camera position for better view
        camera.position.x = 5; //red
        camera.position.y = 0; // green
        camera.position.z = 30; //blue

    }

	 function createModels(){

        /* mirrorCubeCamera = new THREE.CubeCamera(0.1, 5000, 500);
         scene.add(mirrorCubeCamera);
         var mirrorCubeMaterial = new THREE.MeshBasicMaterial({ envMap: mirrorCubeCamera.renderTarget });*/
        var planeGX = new THREE.PlaneGeometry(100, 500);
        var planeGY = new THREE.PlaneGeometry(500, 100);
        plane = new THREE.Mesh(planeGX, MATERIAL.planeMaterial);
        plane.rotation.x = dtr(-90);
        plane.receiveShadow = true;
        plane.position.x = 0;
        plane.position.y = -10;
        plane.position.z = -50
       // scene.add(plane);

        planeLeft = new THREE.Mesh(planeGY, MATERIAL.planeMaterial);
        planeLeft.rotation.y = dtr(90);
        planeLeft.receiveShadow = true;
        planeLeft.position.x = -20;
        planeLeft.position.y = 0;
        planeLeft.position.z = -50;
        //scene.add(planeLeft);

        planeRight = new THREE.Mesh(planeGY, MATERIAL.planeMaterial);
        planeRight.rotation.y = dtr(-90);
        planeRight.receiveShadow = true;
        planeRight.position.x = 30;
        planeRight.position.y = 0;
        planeRight.position.z = -50;
        //scene.add(planeRight);

        planeTop = new THREE.Mesh(planeGX, MATERIAL.planeMaterial);
        planeTop.rotation.x = dtr(90);
        planeTop.receiveShadow = true;
        planeTop.position.x = 0;
        planeTop.position.y = 30;
        planeTop.position.z = -50
        //scene.add(planeTop);

        var powerUpG = new THREE.IcosahedronGeometry(2, 0);
        powerUp = new THREE.Mesh(powerUpG, MATERIAL.collectableMaterial);
        powerUp.position.set(25, 5, -50);
        //scene.add(powerUp);

        var material = new THREE.LineBasicMaterial({
            vertexColors: THREE.VertexColors
        });
        var color;

        for (var j = 0; j < 6; j++) {
            var lineInfo = { lineGeo: new THREE.Geometry(), lineArray: [] }
            lines.push(lineInfo);

            for (var i = 0; i < 5; i++) {
                lineInfo.lineArray.push(createVertex(xPosArray[j]));
            }

            for (var i = 0; i < lineInfo.lineArray.length; i++) {
                lineInfo.lineGeo.vertices.push(
                           new THREE.Vector3(lineInfo.lineArray[i].x, lineInfo.lineArray[i].y, lineInfo.lineArray[i].z));
            }
            
            for (var i = 0; i < lineInfo.lineGeo.vertices.length; i += 2) {
                color = new THREE.Color(0xffffff);
                color.setHex(Math.random() * 0xffffff);
                lineInfo.lineGeo.colors[i] = color;
                lineInfo.lineGeo.colors[i + 1] = lineInfo.lineGeo.colors[i];
            }

            lineInfo.lineGeo.verticesNeedUpdate = true;
            var line = new THREE.Line(lineInfo.lineGeo, material);
            scene.add(line);
        }        

        //axes for reference
        var axes = new THREE.AxisHelper(20);
        //scene.add(axes);
		
		scene.add(player.cube);
    }

    function createVertex(xPos) {
        var lineX = xPos;
        var lineY = Math.random() * 25 - 5;
        var lineZ = -10 + (Math.random() * -200);

        var vertex = { x: lineX, y: lineY, z: lineZ };

        //console.log(lineY, lineZ);

        return vertex;
    }

    function moveLines() {
        for (var i = 0; i < lines.length; i++) {
            lines[i].lineArray.push(createVertex(xPosArray[i]));
            lines[i].lineArray.splice(0, 1);

            lines[i].lineGeo.vertices.push(new THREE.Vector3(lines[i].lineArray[4].x, lines[i].lineArray[4].y, lines[i].lineArray[4].z));
            lines[i].lineGeo.vertices.splice(0, 1);
            lines[i].lineGeo.verticesNeedUpdate = true;
        }
    }

    function createLights(){

        var spotLight = new THREE.SpotLight(0xFFFFFF);
        spotLight.position.set(5, 30, 50);
        spotLight.intensity = 1;
        spotLight.rotation.x = dtr(70);
        spotLight.castShadow = true;
        scene.add(spotLight);

        var spotLight2 = new THREE.SpotLight(0xFFFFFF);
        spotLight2.position.set(-20, 15, -120);
        spotLight2.target = new THREE.Object3D(5, 5, -20);
        spotLight2.intensity = 1;
        spotLight2.castShadow = false;
        scene.add(spotLight2);

        var spotLight3 = new THREE.SpotLight(0xFFFFFF);
        spotLight3.position.set(20, 0, -120);
        spotLight3.target = new THREE.Object3D(5, 5, -20);
        spotLight3.intensity = 1;
        spotLight3.castShadow = false;
        scene.add(spotLight3);

        /* cool hidden effect*/
        var light = new THREE.PointLight(0xffffff, 1, 100);
        light.position.set(5, 10, 50);
        light.intensity = 1;
        scene.add(light);

        renderer.shadowMapEnabled = true;
    }

// ------- GAME UPDATE FUNCTIONS -------------- //
    function update(){
        // schedule next update
        requestAnimationFrame(update);
        // console.log(player.cube.position.y);

        camera.position.x += (player.cube.position.x - camera.position.x) * 0.1;
        camera.position.y += (player.cube.position.y - camera.position.y) * 0.1;
        camera.position.z = player.cube.position.z -2;

        camera.rotation.x = dtr(-0.01 * (player.cube.position.y));

        obstacleHndlr.generate(); // generates enemy based on obstacleHndlr.spawnChance
        obstacleHndlr.updateObstacles();    // updates obstacles locations
        obstacleHndlr.handleDifficulty();   // updates spawn rates

        livesTag.innerHTML = "Lives <br /><br />&nbsp;&nbsp;&nbsp;" + Game.lives;
        timeTag.innerHTML = "Time <br /><br />&nbsp;&nbsp;" + Game.time;
        coinTag.innerHTML = "Coins <br /><br />&nbsp;&nbsp;&nbsp;" + Game.coins;

		if (lineTimer == 20) {
            moveLines();
            lineTimer = 0;
        } else {
            lineTimer++;
        }
		
        /*planeLeft.visible = false;
         mirrorCubeCamera.updateCubeMap(renderer, scene);
         planeLeft.visible = true;*/

        renderer.render(scene, camera);
    }

// OTHER FUNCTIONS
    function dtr(degrees) {
        return degrees * Math.PI / 180;
    }

    window.onload = setup;

}())