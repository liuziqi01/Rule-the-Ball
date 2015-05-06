var Stage = function() {}


/* environment */
var LEFTSIDEBAR;
var CONTAINER, CAMERA, SCENE, RENDERER;
var CONTROLS;
var BACKGROUND_SCENE, BACKGROUND_CAMERA;
var stop = false;
var gameball;


var axes;

var placeholder;


var OBJECTS = new THREE.Object3D;
var grids = new THREE.Object3D;

/*interaction*/
var keyboard = new KeyboardState();
var raycaster = new THREE.Raycaster();
var MOUSE = new THREE.Vector2();

var MOUSE_FLAG = 0;             // to tell the difference between drag and click


var onSimulation = false;
var blockType = 0;






/* Game Initialization */
Stage.prototype.init = function(stage_num) {

    /************** BASIC ELEMENTS **************/

    /* check if SPACE_SIZE is a even number */
    if (SPACE_SIZE % 2) {
        SPACE_SIZE += 1;
    }

    splash.remove();

    /* CONTAINER setup */
    CONTAINER = document.getElementById("game");
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
    CONTROLS = new THREE.TrackballControls(CAMERA, RENDERER.domElement);
    CONTROLS.zoomSpeed = 0.1;
    CONTROLS.rotateSpeed = 1;



    /* Lights setup */
    SCENE.add(new THREE.AmbientLight(White));

    /************** Objects **************/
    SCENE.add(OBJECTS);

    // OBJECTS.add(new gameElement(new inGameCoordinate(), "ground"));


    SCENE.add(new gameElement(new inGameCoordinate(), "ground"));


    
    
    var jsonLoader = new THREE.JSONLoader();
    jsonLoader.load( "model/woodtrail.js", addModelToScene);
    
    function addModelToScene( geometry,materials ){
    
        var material = new THREE.MeshPhongMaterial({color:'#503722',specular: '#a9fcff'});
        console.log(material);
        console.log(geometry);
        var android = new Physijs.ConcaveMesh(
            geometry,
            Physijs.createMaterial(new THREE.MeshBasicMaterial({
            map: THREE.ImageUtils.loadTexture('Images/wood.jpg'),transparent:false}), 0,1),
             0);
        android.castShadow = true;
        android.receiveShadow = true;
        android.scale.set(20,20,20);
        android.position.set(0,0,0);
        console.log(android.material);
        SCENE.add( android );
    }
    


    
    //loader.load('model/bottom.js',hello);

var hello = function()
    {console.log("Hello");}
  

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
        grids.add(frame);
    }
    SCENE.add(grids);


    document.getElementById("selectButtonBox").addEventListener("click", function() {
        blockType = 0;
    });
    document.getElementById("selectButtonDiamond").addEventListener("click", function() {
        blockType = 1;
    });
    document.getElementById("selectButtonGold").addEventListener("click", function() {
        blockType = 2;
    });

    window.addEventListener('resize', onWindowResize, false);


    document.getElementById("game").addEventListener('mousemove', function(event) {
        MOUSE_FLAG = 1;
        onDocumentMouseMove(event);
    }, false);


    // axes = buildAxes();
    // SCENE.add(axes);


    SCENE.add(buildMaps(stage_num));

    placeholder = new gameElement(new inGameCoordinate(6,6,6), "posholder");

    SCENE.add(placeholder);
    gameball = new gameElement(new inGameCoordinate(6,6,6), "gameBall");

    SCENE.add(gameball);
    gameball.applyCentralForce(new THREE.Vector3(100,1,1));
    gameball.freeze();
    RENDERER.render(BACKGROUND_SCENE, BACKGROUND_CAMERA);
    RENDERER.render(SCENE, CAMERA);
    animate();
}
Stage.prototype.stop = function() {
    this.stop = true;
}
// var handleCollision = function(collided_with, linearVelocity, angularVelocity) {
//     collided_with.setLinearVelocity(collided_with.getLinearVelocity().multiplyScalar(1.1));
// };
// box.addEventListener('collision', handleCollision);
function animate() {

    /* looping */
    //setTimeout(function() {
    requestAnimationFrame(animate);



    /* User Control */
    CONTROLS.update();
    SCENE.simulate();

    if (onSimulation) {
        console.log(gameball.getLinearVelocity().x);
        // sphere._dirtyPosition = true;
        CAMERA.position.set(gameball.position.x - 50, gameball.position.y + 50, gameball.position.z);
        CAMERA.lookAt(gameball.position);
        if(checkEnd = true)
        {
            makeSplash(stage_num+1);
        }
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
function checkEnd()
{
    return Math.abs(gameball.position.x - endingPo[0])<10 && Math.abs(gameball.position.y - endingPo[1])<10 && Math.abs(gameball.position.z - endingPo[2])<10
}


