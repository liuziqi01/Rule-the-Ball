var FPS = 60; // max = 60 as limited by the requestAnimationFrame()

/* coordinate conversion */
var SPACE_SIZE = 12; // the game field is a $SPACE_SIZE by $SPACE_SIZE by $SPACE_SIZE cube. and make sure this is always an even number
// and note the range of the coordinate is [0, SPACE_SIZE - 1]

var UNIT_STEP = 30; // the edge length of each unit box


Physijs.scripts.worker = '/Script/physijs_worker.js';
Physijs.scripts.ammo = '/Script/ammo.js';


/* timing */
// the scale of the return value is ms
var timer = new Date();
var current_time = 0;
var last_time = 0;
var timeDiff = 0;

/* information */
var render_stats;
var physics_stats;

/* environment */
var CONTAINER;
var CAMERA, SCENE, RENDERER;
//var TRACKBALL_CONTROL;
var mesh, geometry;
var sphere;
var BACKGROUND_SCENE,BACKGROUND_CAMERA;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var raycaster;
var mouse;
var OBJECTS = [];


/* OBJECTS state value */
var BOX_DEFAULT_TEXTURE = 'Images/crate.jpg';
var SPHERE_DEFAULT_TEXTURE = 'Images/basketball.jpg'
var radius = 10;

var default_speed = 2 // pixels per ms

var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;
var canJump = true;
var mouse_click = false;


var keyboardState;// this is for the keyboard layout
var keyboard = new KeyboardState(); // the keyboard polling




/* Game Initialization */
function init() {

	/************** BASIC ELEMENTS **************/

	/* validate the FPS */
	if (FPS > 60)
		FPS = 60;
    else if (FPS < 0)
        FPS = 0;

    
    /* CONTAINER setup */
    CONTAINER = document.createElement( 'div' );
    CONTAINER.setAttribute("id", "odie");
    document.body.appendChild( CONTAINER );
  
   	/* RENDERER setup */
    RENDERER = new THREE.WebGLRenderer();
    RENDERER.setPixelRatio( window.devicePixelRatio );
    RENDERER.setSize( window.innerWidth, window.innerHeight );
    CONTAINER.appendChild( RENDERER.domElement );

    /* SCENE with gravity */
    SCENE = new Physijs.Scene;
    SCENE.setGravity(new THREE.Vector3( 0, - SPACE_SIZE / 2 * UNIT_STEP - 1, 0 ));
    SCENE.addEventListener(
        'update',
        function() {
            //applyForce();
            SCENE.simulate( undefined, 1 );
            // physics_stats.update();
        }
    );

    /* background setup */
    var backgroundMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(2, 2, 0),
        new THREE.MeshBasicMaterial({
            map: THREE.ImageUtils.loadTexture( 'Images/blue.png'),opacity:0.8,transparent: false
        }));

    backgroundMesh.material.depthTest = false;
    backgroundMesh.material.depthWrite = false;
    BACKGROUND_SCENE = new THREE.Scene();
    BACKGROUND_CAMERA = new THREE.Camera();
    BACKGROUND_SCENE.add(BACKGROUND_CAMERA );
    BACKGROUND_SCENE.add(backgroundMesh );
    

    /* CAMERA setup */
    CAMERA = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000 );
    CAMERA.position.set( 0, UNIT_STEP * SPACE_SIZE * 0.75,  UNIT_STEP * SPACE_SIZE * 1.2 );
    //CAMERA.lookAt(new THREE.Vector3(0,( 0 - SPACE_SIZE / 2 + 0.5) * UNIT_STEP,0));
 CAMERA.lookAt(new THREE.Vector3(0,0,0));

/*
    /* Trackball Control setup 
  	TRACKBALL_CONTROL = new THREE.TRACKBALL_CONTROLs( CAMERA, RENDERER.domElement );
  	TRACKBALL_CONTROL.minDistance = 200;
 	TRACKBALL_CONTROL.maxDistance = 500;
*/

 	/* Lights setup */
    SCENE.add( new THREE.AmbientLight( White ) );



    /* keyboard layout setup */
    var keyboardLayout = document.getElementById("keyboard_layout_us");
    //	keyboardState = keyboardLayout.checked || "US";
    keyboardState = "keyboard_layout_us" ;


	/************** Objcets **************/

    /* sphere */
    var sphere = GameSphere.createNew(0, 100, 0);
    SCENE.add(sphere);
    OBJECTS.push(sphere);
    sphere.__dirtyPosition = true;
    sphere.__dirtyRotation = true;

  
    // Ground
    ground = new Physijs.BoxMesh(
        new THREE.BoxGeometry(SPACE_SIZE * UNIT_STEP, 3 , SPACE_SIZE * UNIT_STEP),
        Physijs.createMaterial(new THREE.MeshBasicMaterial({color: 0xffffff, opacity: 0.7,transparent: true}), 0, 1),
        0 // mass
    );
    ground.position.x=0;
    ground.position.y= ( 0 - SPACE_SIZE / 2 + 0.5) * UNIT_STEP;
    ground.position.z=0;
    ground.receiveShadow = true;
    SCENE.add(ground);


   /* grid */
    var grid = new THREE.Geometry();

    for ( var i = 0; i <= SPACE_SIZE; ++i) {

       grid.vertices.push( new THREE.Vector3(      - SPACE_SIZE / 2 * UNIT_STEP,      ( 0 - SPACE_SIZE / 2 + 0.5) * UNIT_STEP ,      (i - SPACE_SIZE/2) * UNIT_STEP));
       grid.vertices.push( new THREE.Vector3(        SPACE_SIZE / 2 * UNIT_STEP,      ( 0 - SPACE_SIZE / 2 + 0.5) * UNIT_STEP ,      (i - SPACE_SIZE/2 ) * UNIT_STEP ) );
       grid.vertices.push( new THREE.Vector3( (i - SPACE_SIZE /2  ) * UNIT_STEP,      ( 0 - SPACE_SIZE / 2 + 0.5) * UNIT_STEP ,      - SPACE_SIZE / 2 * UNIT_STEP      ) );
       grid.vertices.push( new THREE.Vector3( (i - SPACE_SIZE / 2 ) * UNIT_STEP,      ( 0 - SPACE_SIZE / 2 + 0.5) * UNIT_STEP ,        SPACE_SIZE / 2 * UNIT_STEP      ) );
        
    }

	var material = new THREE.LineBasicMaterial( { color: 0x000000,transparent: false} );
	var line = new THREE.Line( grid, material, THREE.LinePieces );
	SCENE.add( line );



    var box = GameBox.createNew(20, 40, 90);
    box.inGamePos(10, 1, 9);
    SCENE.add(box);
    OBJECTS.push(box);


    raycaster = new THREE.Raycaster();
    //raycaster.params.PointCloud.threshold = threshold;
    mouse = new THREE.Vector2();


    /* timer */
    last_time = timer.getTime();

document.addEventListener( 'click', onDocumentMouseClick, false );
      requestAnimationFrame(animate);
    
}

function onDocumentMouseClick(event)
{
	event.preventDefault();
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
mouse_click = true;
}

// function draw_sphere(){

//     if(moveForward){
//         // sphere.position.y += default_speed * timeDiff;
//         // sphere.rotation.x += default_speed * timeDiff / radius;
//         sphere.position.y += default_speed;
//         var q = new THREE.Quaternion();
//         q.setFromAxisAngle( new THREE.Vector3(1,0,0), -default_speed / radius ); 
//         sphere.quaternion.multiplyQuaternions( q, sphere.quaternion );
//     }
    
//     if(moveBackward){
//         sphere.position.y -= default_speed;
//         var q = new THREE.Quaternion();
//         q.setFromAxisAngle( new THREE.Vector3(1,0,0), +default_speed / radius ); 
//         sphere.quaternion.multiplyQuaternions( q, sphere.quaternion );
//     }

//     if(moveLeft){
//         sphere.position.x -= default_speed;

//         var q = new THREE.Quaternion();
//         q.setFromAxisAngle( new THREE.Vector3(0,1,0), -default_speed / radius ); 
//         sphere.quaternion.multiplyQuaternions( q, sphere.quaternion );
//     }

//     if(moveRight){
//         sphere.position.x += default_speed;

//         var q = new THREE.Quaternion();
//         q.setFromAxisAngle( new THREE.Vector3(0,1,0), +default_speed / radius ); 
//         sphere.quaternion.multiplyQuaternions( q, sphere.quaternion );
//     }

// }


function animate(){
	/* looping */
    //setTimeout(function() {
        requestAnimationFrame(animate);

        // timer
        current_time = timer.getTime();
        timeDiff = current_time - last_time;
        last_time = current_time;


    	/* User Control */
 //		TRACKBALL_CONTROL.update();

  SCENE.simulate();
      
        //select the mouse clicked object
        raycaster.setFromCamera( mouse, CAMERA );


    if(mouse_click)
{
 var intersections = raycaster.intersectObjects(OBJECTS.concat([ground]));
   var intersection = ( intersections.length ) > 0 ? intersections[ 0 ].point : null;
if(intersection) 
{
 var box_material = Physijs.createMaterial(
            new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture( 'Images/crate.jpg') }),
            1, // friction coefficient
            .0 // e
            // note the construction material should be solid and not bounce at all
        );
 var box = new Physijs.BoxMesh(
        new THREE.BoxGeometry( UNIT_STEP, UNIT_STEP, UNIT_STEP),
        box_material,
        10 // mass
    );
    box.position.set(
        (parseInt(intersection.x/SPACE_SIZE/2)+0.5)*UNIT_STEP,
        (parseInt(intersection.y/SPACE_SIZE/2)+1.3)*UNIT_STEP,
        (parseInt(intersection.z/SPACE_SIZE/2)+0.5)*UNIT_STEP
    );
    box.castShadow = true;
    SCENE.add( box );

OBJECTS.push(box);

mouse_click=false;
}
}
/*
else{
    var intersections = raycaster.intersectObjects(OBJECTS);
   var intersection = ( intersections.length ) > 0 ? intersections[ 0 ].object : null;
if(intersection) intersection.position.set(intersection.position.x, intersection.position.y + 20,intersection.position.z);

}
*/



		/* refresh frame */
        RENDERER.autoClear = false;
        RENDERER.clear();
        RENDERER.render(BACKGROUND_SCENE , BACKGROUND_CAMERA );
        RENDERER.render(SCENE, CAMERA);
        // render_stats.update();
        keyboard.update();
    
    //}, 1000 / FPS);    
}


