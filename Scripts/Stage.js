var Stage = function() {}
var NIMA;
var jsons = new THREE.Object3D;
var caonima;

var START = new inGameCoordinate(6, 6, 11);

/* environment */
var LEFTSIDEBAR;
var CONTAINER, CAMERA, SCENE, RENDERER;
var CONTROLS;
var BACKGROUND_SCENE, BACKGROUND_CAMERA;
var stop = false;
var gameball;


var axes;

var lines;

var placeholder;

var stage_num_this;
var OBJECTS = new THREE.Object3D;
var grids = new THREE.Object3D;

var camPosition_prev = new THREE.Vector3();

/*interaction*/
var keyboard;
var raycaster = new THREE.Raycaster();
var MOUSE = new THREE.Vector2();

var MOUSE_FLAG = 0; // to tell the difference between drag and click


var onSimulation = false;
var blockType = 0;



/* Game Initialization */
Stage.prototype.init = function(stage_num) {
    keyboard = new KeyboardState()
    this.stop = false;
    stage_num_this = stage_num;
    /************** BASIC ELEMENTS **************/

    /* check if SPACE_SIZE is a even number */
    if (SPACE_SIZE % 2) {
        SPACE_SIZE += 1;
    }
    console.log("here");
    //splash.setAttribute("style","position:fixed");
    splash.remove();

    /* CONTAINER setup */
    CONTAINER = document.createElement('div');
    CONTAINER.id = "game";
    //document.appendChild(CONTAINER);
    //CONTAINER = document.getElementById("game");
    document.body.appendChild(CONTAINER);
    LEFTSIDEBAR = document.getElementById("selectionTab");
    console.log("here");
    /* RENDERER setup */
    RENDERER = new THREE.WebGLRenderer();
    RENDERER.setPixelRatio(window.devicePixelRatio);
    RENDERER.setSize(window.innerWidth, window.innerHeight);
    CONTAINER.appendChild(RENDERER.domElement);

    /* SCENE with gravity */
    SCENE = new Physijs.Scene;
    SCENE.setGravity(new THREE.Vector3(0, -SPACE_SIZE / 2 * UNIT_STEP - 1, 0));
    SCENE.addEventListener(
        'update',
        function() {
            SCENE.simulate(undefined, 1);
        }
    );

    /* background setup */
    var backgroundMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(2, 2, 0),
        new THREE.MeshBasicMaterial({
            map: THREE.ImageUtils.loadTexture('Images/blue.png'),
            opacity: 0.8,
            transparent: false
        }));

    backgroundMesh.material.depthTest = false;
    backgroundMesh.material.depthWrite = false;
    BACKGROUND_SCENE = new THREE.Scene();
    BACKGROUND_CAMERA = new THREE.Camera();

    BACKGROUND_SCENE.add(BACKGROUND_CAMERA);
    BACKGROUND_SCENE.add(backgroundMesh);


    /* CAMERA setup */
    CAMERA = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
    CAMERA.position.set(0, UNIT_STEP * SPACE_SIZE * 0.75, UNIT_STEP * SPACE_SIZE * 1.2);
    //CAMERA.lookAt(new THREE.Vector3(0,( 0 - SPACE_SIZE / 2 + 0.5) * UNIT_STEP,0));
    CAMERA.lookAt(new THREE.Vector3(0, 0, 0));


    // Trackball Control setup 
    // CONTROLS = new THREE.TrackballControls(CAMERA, RENDERER.domElement);
    CONTROLS = new THREE.TrackballControls(CAMERA, RENDERER.domElement);
    CONTROLS.zoomSpeed = 0.1;
    CONTROLS.rotateSpeed = 1;



    /* Lights setup */
    SCENE.add(new THREE.AmbientLight(White));

    /************** Objects **************/
    SCENE.add(OBJECTS);

    // OBJECTS.add(new gameElement(new inGameCoordinate(), "ground"));


    SCENE.add(new gameElement(new inGameCoordinate(), "ground"));








    // var try2 = new gameElement(new inGameCoordinate(6, 11, 11), "track");
    // SCENE.add(try2);


    var zero = new absCoordinate(0, 0, 0);
    zero.setbyInGame(6, 11, 11);
    var jsonLoader = new THREE.JSONLoader();


    // caonima = new THREE.Geometry;


    // caonima = new THREE.Geometry;
    var tempge = new THREE.BoxGeometry(UNIT_STEP, UNIT_STEP, UNIT_STEP);

    // caonima = new THREE.BoxGeometry(UNIT_STEP, UNIT_STEP, UNIT_STEP);

    function haomeng() {
        caonima = new THREE.BoxGeometry(UNIT_STEP, UNIT_STEP, UNIT_STEP);
    }
    haomeng;
    // caonima = new THREE.BoxGeometry(UNIT_STEP, UNIT_STEP, UNIT_STEP);

    // jsonLoader.load("model/woodtrail.js",
    //     function(g) {
    //     console.log("nice");
    //     // NIMA = g;
    //     // caonima = g.clone();
    // });

    // hehe(caonima);


    function hehe(geometry) {
        var shabi = new Physijs.ConcaveMesh(
            // NIMA,
            geometry,
            // new THREE.BoxGeometry( UNIT_STEP, UNIT_STEP,  UNIT_STEP),
            Physijs.createMaterial(new THREE.MeshBasicMaterial({
                map: THREE.ImageUtils.loadTexture('Images/RockSmooth.jpg'),
                transparent: false
            }), 0, 1),
            0);
        shabi.castShadow = true;
        shabi.receiveShadow = true;
        shabi.scale.set(15, 10, 14);
        shabi.position.set(zero.x, zero.y - 5, zero.z);
        SCENE.add(shabi);
    }

    // var bench = new gameElement(new inGameCoordinate(6,11,11), "startingPoint");
    // SCENE.add(bench);




    /* grid */
    var grid = new THREE.Geometry();
    for (var height = (0 - SPACE_SIZE / 2) * UNIT_STEP; height < (0 + SPACE_SIZE / 2) * UNIT_STEP; height = height + UNIT_STEP) {
        for (var i = 0; i <= SPACE_SIZE; ++i) {

            grid.vertices.push(new THREE.Vector3(-SPACE_SIZE / 2 * UNIT_STEP, height, (i - SPACE_SIZE / 2) * UNIT_STEP));
            grid.vertices.push(new THREE.Vector3(SPACE_SIZE / 2 * UNIT_STEP, height, (i - SPACE_SIZE / 2) * UNIT_STEP));
            grid.vertices.push(new THREE.Vector3((i - SPACE_SIZE / 2) * UNIT_STEP, height, -SPACE_SIZE / 2 * UNIT_STEP));
            grid.vertices.push(new THREE.Vector3((i - SPACE_SIZE / 2) * UNIT_STEP, height, SPACE_SIZE / 2 * UNIT_STEP));

        }
        if (height == (0 - SPACE_SIZE / 2) * UNIT_STEP)
            var material = new THREE.LineBasicMaterial({
                color: 0x000000,
                transparent: false
            });
        else
            var material = new THREE.LineBasicMaterial({
                color: 0xf8f8f8,
                transparent: true
            });
        lines = new THREE.Line(grid, material, THREE.LinePieces);
        SCENE.add(lines);


        var frame = new THREE.Mesh(new THREE.BoxGeometry(UNIT_STEP * SPACE_SIZE, 1, UNIT_STEP * SPACE_SIZE), new THREE.MeshBasicMaterial());
        frame.visible = false;
        frame.position.x = 0;
        frame.position.z = 0;
        frame.position.y = (height / UNIT_STEP) * UNIT_STEP;
        grids.add(frame);
    }
    SCENE.add(grids);


    document.getElementById("selectButtonBox").addEventListener("click", function() {
                                                                document.getElementById("info").innerHTML = "Normal Box <br>Perfect for practice";
        blockType = 0;
    });
    document.getElementById("selectButtonDiamond").addEventListener("click", function() {
         document.getElementById("info").innerHTML = "Diamond Cube <br>Zero Friction Surface";
        blockType = 1;
    });
    document.getElementById("selectButtonGold").addEventListener("click", function() {
                                                                 document.getElementById("info").innerHTML = "Golden Cube <br> Accelerating!";
        blockType = 2;
    });
    document.getElementById("selectButtonTrail").addEventListener("click", function() {
                                                                  document.getElementById("info").innerHTML = "Wooden Trail";
        blockType = 3;
    });
    document.getElementById("selectButtonTrail2").addEventListener("click", function() {
                                                            blockType = 4;
                                                            });
    document.getElementById("selectButtonSponge").addEventListener("click", function() {
                                                                   document.getElementById("info").innerHTML = "Sponge <br> It doesn't like ball...";
        blockType = 5;
    });

    window.addEventListener('resize', onWindowResize, false);


    document.getElementById("game").addEventListener('mousemove', function(event) {
        MOUSE_FLAG = 1;
        onDocumentMouseMove(event);
    }, false);


    // axes = buildAxes();
    // SCENE.add(axes);



    var map = buildMaps(stage_num_this);
    while (map.children.length > 2) {
        SCENE.add(map.children[0]);
    }
    // to add the starting point and the ending point
    SCENE.add(map);



    placeholder = new gameElement(START, "posholder");

    SCENE.add(placeholder);
    gameball = new gameElement(START, "gameBall");
    SCENE.add(gameball);

    gameball.freeze();
    RENDERER.render(BACKGROUND_SCENE, BACKGROUND_CAMERA);
    RENDERER.render(SCENE, CAMERA);
    stop = false;
    console.log(SCENE);
    i = 0;
    animate();

}


function animate() {

    var aa = new absCoordinate();
    aa.setbyInGame(endingPo[0], endingPo[1], endingPo[2]);

    var checkEnd = Math.abs(gameball.position.x - aa.x) < 10 && Math.abs(gameball.position.y - aa.y) < 10 && Math.abs(gameball.position.z - aa.z) < 10;
    
    if (!(gameball.position.x < UNIT_STEP * SPACE_SIZE / 2 && gameball.position.x > -UNIT_STEP * SPACE_SIZE / 2 && gameball.position.y > -UNIT_STEP * SPACE_SIZE / 2 && gameball.position.y < UNIT_STEP * SPACE_SIZE / 2)) {
        alert("you loose");
        this.stop = true;
    }


    //console.log(checkEnd);

    if (!this.stop) {
        /* refresh frame */
        requestAnimationFrame(animate);
        RENDERER.autoClear = false;
        RENDERER.clear();
        RENDERER.render(BACKGROUND_SCENE, BACKGROUND_CAMERA);
        RENDERER.render(SCENE, CAMERA);
        // render_stats.update();
        keyboard.update();
        SCENE.simulate();
    }
    //}, 1000 / FPS);

    if (onSimulation) {
        // sphere._dirtyPosition = true;
        CAMERA.position.set(gameball.position.x, gameball.position.y + 150, gameball.position.z + 150);
        CAMERA.lookAt(gameball.position);
        //console.log(checkEnd);

        if (checkEnd) {
            console.log("splash");
            onSimulation = false;
            stop = true;
            CONTROLS.update();
            CONTAINER.remove();
            makeSplash(stage_num_this + 1);

        }
    } else {
        /* User Control */
        CONTROLS.update();

    }
}

Stage.prototype.stop = function() {
    this.stop = true;
}
