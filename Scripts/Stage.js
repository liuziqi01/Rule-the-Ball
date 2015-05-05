var Stage = function() {}


/* timing */
// the scale of the return value is ms
var timer = new Date();
var current_time = 0;
var last_time = 0;
var timeDiff = 0;
this.stop = false;
/* environment */
var LEFTSIDEBAR;
var CONTAINER, CAMERA, SCENE, RENDERER;
//var TRACKBALL_CONTROL;
var BACKGROUND_SCENE, BACKGROUND_CAMERA;


var axes;



var sphere;
var OBJECTS = new THREE.Object3D;
var grids = new THREE.Object3D;
var materialArray = [];

/*interaction*/
var keyboard = new KeyboardState(); 
var raycaster = new THREE.Raycaster();
var MOUSE = new THREE.Vector2();
var mouse_click = false;
var simulation = false;
var blockType = 0;
var sphere_simulation;






/* Game Initialization */
Stage.prototype.init = function(event) {

    /************** BASIC ELEMENTS **************/

    /* validate the FPS */
    if (FPS > 60)
        FPS = 60;
    else if (FPS < 0)
        FPS = 0;

    /* check if SPACE_SIZE is a even number */
    if (SPACE_SIZE % 2){
        SPACE_SIZE += 1;
    }



    /* CONTAINER setup */
    CONTAINER = document.getElementById("game");
    LEFTSIDEBAR = document.getElementById("selectionTab");

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

    /*
        /* Trackball Control setup 
        TRACKBALL_CONTROL = new THREE.TRACKBALL_CONTROLs( CAMERA, RENDERER.domElement );
        TRACKBALL_CONTROL.minDistance = 200;
        TRACKBALL_CONTROL.maxDistance = 500;
    */

    /* Lights setup */
    SCENE.add(new THREE.AmbientLight(White));

    /************** Objects **************/
    SCENE.add(OBJECTS);

    sphere = new THREE.Mesh(THREE.GeometryUtils.merge(new THREE.SphereGeometry(4, 10, 10),new THREE.BoxGeometry(3, 3, 10)), new THREE.MeshLambertMaterial({
    // sphere = new THREE.Mesh(new THREE.SphereGeometry(4, 10, 10), new THREE.MeshLambertMaterial({
        map: THREE.ImageUtils.loadTexture('Images/basketball.jpg')
    }));
    // sphere.position.set(-1.5 * UNIT_STEP, 1.5 * UNIT_STEP, 2.5 * UNIT_STEP);
    sphere.position.set(0, 0, 0);
    SCENE.add(sphere);


    // Ground
    ground = new Physijs.BoxMesh(
        new THREE.BoxGeometry(SPACE_SIZE * UNIT_STEP, 3, SPACE_SIZE * UNIT_STEP),
        Physijs.createMaterial(new THREE.MeshBasicMaterial({
            color: 0xffffff,
            opacity: 0.7,
            transparent: true
        }), 0, 1),
        0 // mass
    );
    ground.position.x = 0;
    ground.position.y = (0 - SPACE_SIZE / 2) * UNIT_STEP;
    ground.position.z = 0;
    ground.receiveShadow = true;
    SCENE.add(ground);


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
        var line = new THREE.Line(grid, material, THREE.LinePieces);
        SCENE.add(line);


        var frame = new THREE.Mesh(new THREE.BoxGeometry(UNIT_STEP * SPACE_SIZE, 1, UNIT_STEP * SPACE_SIZE), new THREE.MeshBasicMaterial());
        frame.visible = false;
        frame.position.x = 0;
        frame.position.z = 0;
        frame.position.y = (height / UNIT_STEP) * UNIT_STEP;
        // SCENE.add(frame);
        grids.add(frame);
    }
    SCENE.add(grids);



    /* timer */
    last_time = timer.getTime();


    document.getElementById("selectButtonBox").addEventListener("click", function() {
        blockType = 0;
    });
    document.getElementById("selectButtonDiamond").addEventListener("click", function() {
        blockType = 1;
    });
    document.getElementById("selectButtonGold").addEventListener("click", function() {
        blockType = 2;
    });

    window.addEventListener( 'resize', onWindowResize, false );

    // var try1 = new gameBox(0);
    // SCENE.add(try1);
    // var try2 = new atomicElement(new absCoordinate(10, 10, 10), "cylinder", 10, 100, 10);
    // SCENE.add(try2);
    var ingame = new inGameCoordinate;
    ingame.setbyAbs(0, 0, 0);
    var try3 = new gameElement(ingame, "cylinder", 1);
    SCENE.add(try3);

        axes = buildAxes();
    SCENE.add( axes );

    // this.animate;
    animate();

}


function putBoxbyMouse(MOUSE, blockType) {
    raycaster.setFromCamera( MOUSE, CAMERA );
    var intersections = raycaster.intersectObjects(grids.children);
    var intersection = (intersections.length) > 0 ? intersections[0].point : null;

    
    if (intersection) {
            intersections[0].object.material.color.set( 0xff0000 );
        var ingamepos = new inGameCoordinate;
        
        ingamepos.setbyAbs(intersection.x, intersection.y, intersection.z);
        console.log("intersection.x : " + intersection.x + "; ingamepos.x : " + ingamepos.x);
        var box = new gameElement(ingamepos, "box", blockType);

        box.castShadow = true;

        OBJECTS.add(box);
    }
}

            // var handleCollision = function(collided_with, linearVelocity, angularVelocity) {
            //     collided_with.setLinearVelocity(collided_with.getLinearVelocity().multiplyScalar(1.1));
            // };
            // box.addEventListener('collision', handleCollision);
function animate() {

    /* looping */
    //setTimeout(function() {
    requestAnimationFrame(animate);

    // timer
    current_time = timer.getTime();
    timeDiff = current_time - last_time;
    last_time = current_time;


    /* User Control */
    // TRACKBALL_CONTROL.update();

    SCENE.simulate();

    //select the MOUSE clicked object
    raycaster.setFromCamera(MOUSE, CAMERA);


    if (mouse_click) {
        putBoxbyMouse(MOUSE, blockType);
        mouse_click = false;

    }

    if (simulation) {
        console.log(sphere_simulation.getLinearVelocity().x);
        sphere._dirtyPosition = true;
        CAMERA.position.set(sphere_simulation.position.x - 50, sphere_simulation.position.y + 50, sphere_simulation.position.z);
        CAMERA.lookAt(sphere_simulation.position);
    }

    if (!this.stop) {
        /* refresh frame */
        RENDERER.autoClear = false;
        RENDERER.clear();
        RENDERER.render(BACKGROUND_SCENE, BACKGROUND_CAMERA);
        RENDERER.render(SCENE, CAMERA);
        // render_stats.update();
        keyboard.update();
    } else delete keyboard;
    //}, 1000 / FPS);    
}


Stage.prototype.stop = function() {
    this.stop = true;
}
