var fps = 60; // max = 60 as limited by the requestAnimationFrame()

'use strict';

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
 var physics_stats

/* environment */
var container;
var camera, scene, renderer;
var trackBallControl;
var mesh, geometry;
var sphere;
var backgroundScene,backgroundCamera;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var raycaster;
var mouse;
var objects = [];


/* objects state value */
var radius = 10;

var default_speed = 2 // pixels per ms

var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;
var canJump = true;


var keyboardState;// this is for the keyboard layout
var keyboard = new KeyboardState(); // the keyboard polling


function init() {

	/************** BASIC ELEMENTS **************/

	/* validate the fps */
	if (fps > 60)
		fps = 60;
    else if (fps < 0)
        fps = 0;

    
    /* container setup */
    container = document.createElement( 'div' );
    container.setAttribute("id", "odie");
    document.body.appendChild( container );
	

	/* on screen text */
    var info = document.createElement('div');
    info.setAttribute("id", "info");
    info.style.position = 'absolute';
    info.style.top  = '10px';
    info.style.width = '100%';
    info.style.textAlign = 'center';
    info.style.fontStyle = "normal";		// normal|italic|oblique|initial|inherit
    info.style.fontSize = "medium"			//Sets the size of the font to different fixed sizes, from xx-small to medium to xx-large
    info.innerHTML = '你好，这是一个3D的球';
    container.appendChild(info);
    

  
   	/* renderer setup */
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );


    /* rendering information */
    render_stats = new Stats();
    render_stats.domElement.style.position = 'absolute';
    render_stats.domElement.style.top = '1px';
    render_stats.domElement.style.zIndex = 100;
    document.getElementById( 'viewport' ).appendChild( render_stats.domElement );

    physics_stats = new Stats();
    physics_stats.domElement.style.position = 'absolute';
    physics_stats.domElement.style.top = '50px';
    physics_stats.domElement.style.zIndex = 100;
    document.getElementById( 'viewport' ).appendChild( physics_stats.domElement );
    
    /* scene with gravity */
    scene = new Physijs.Scene;
    scene.setGravity(new THREE.Vector3( 0, -30, 0 ));
    scene.addEventListener(
        'update',
        function() {
            //applyForce();
            scene.simulate( undefined, 1 );
            physics_stats.update();
        }
    );

    /* background setup */
    var backgroundMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(2, 2, 0),
        new THREE.MeshBasicMaterial({
            map: THREE.ImageUtils.loadTexture( 'Images/Seaside.jpg')
        }));

    backgroundMesh.material.depthTest = false;
    backgroundMesh.material.depthWrite = false;
    backgroundScene = new THREE.Scene();
    backgroundCamera = new THREE.Camera();
    backgroundScene.add(backgroundCamera );
    backgroundScene.add(backgroundMesh );
    

    /* camera setup */
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.set( 0, 300,300 );
    camera.lookAt(new THREE.Vector3(0,0,0));

/*
    /* Trackball Control setup 
  	trackBallControl = new THREE.TrackballControls( camera, renderer.domElement );
  	trackBallControl.minDistance = 200;
 	trackBallControl.maxDistance = 500;
*/

 	/* Lights setup */
    scene.add( new THREE.AmbientLight( White ) );

    // the point light following the camera
    // var light = new THREE.PointLight( White );
    // light.position.copy( camera.position );
    // scene.add( light );


    /* keyboard layout setup */
    var keyboardLayout = document.getElementById("keyboard_layout_us");
//	keyboardState = keyboardLayout.checked || "US";
keyboardState = "keyboard_layout_us" ;


	/************** Objcets **************/

    /* sphere */
 
    var sphere_material = Physijs.createMaterial(
        new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture( 'Images/basketball.jpg' ) }),
        .4, // low friction
        .3 // high restitution
    );

    sphere = new Physijs.SphereMesh(
        new THREE.SphereGeometry( radius, 100, 100 ),
        sphere_material,
        10 // mass
    );
    sphere.position.set(
        0,
        10,
        radius + 2.5
    );
    sphere.rotation.set(
        0,
        0,
        0
    );
    sphere.castShadow = true;
    scene.add(sphere);
    sphere.__dirtyPosition = true;
    sphere.__dirtyRotation = true;



    /* cube */


/*
    var cube_materials = [
       new THREE.MeshLambertMaterial({
           map: THREE.ImageUtils.loadTexture('Images/basketball_court_floor.jpg') // +x
       }),
       new THREE.MeshLambertMaterial({
           map: THREE.ImageUtils.loadTexture('Images/basketball_court_floor.jpg') // -x
       }),
new THREE.MeshLambertMaterial({
           map: THREE.ImageUtils.loadTexture('Images/basketballcourt.png') // +y
       }),
       new THREE.MeshLambertMaterial({
           map: THREE.ImageUtils.loadTexture('Images/basketball_court_floor.jpg') // -y
       }),

       new THREE.MeshLambertMaterial({
           map: THREE.ImageUtils.loadTexture('Images/basketball_court_floor.jpg') // +z
       }),
       
       new THREE.MeshLambertMaterial({
           map: THREE.ImageUtils.loadTexture('Images/basketball_court_floor.jpg') // -z
       })


    ];

    

    */
  
// grid

    var size = 150, step = 30;

    var grid = new THREE.Geometry();

    for ( var i = - size; i <= size; i += step ) {

	grid.vertices.push( new THREE.Vector3( - size, 0, i ) );
	grid.vertices.push( new THREE.Vector3(   size, 0, i ) );
	grid.vertices.push( new THREE.Vector3( i, 0, - size ) );
	grid.vertices.push( new THREE.Vector3( i, 0,   size ) );
		
}

	var material = new THREE.LineBasicMaterial( { color: 0x000000, opacity: 0.5, transparent: true} );
   //  grid.position.x = 0;
   // grid.position.y=0;
	var line = new THREE.Line( grid, material, THREE.LinePieces );
	scene.add( line );


  
    // Ground
    ground = new Physijs.BoxMesh(
        new THREE.BoxGeometry(300, 3 , 300),
        Physijs.createMaterial(new THREE.MeshBasicMaterial({color: 0xffffff, opacity: 0.7,transparent: true}), 0, 1),
        0 // mass
    );
   ground.position.x=0;
ground.position.y=0;
ground.position.z=0;
    ground.receiveShadow = true;
    scene.add( ground );

/*
     ground = new Physijs.PlaneMesh(
        new THREE.PlaneGeometry(500, 500),
        Physijs.createMaterial(new THREE.MeshBasicMaterial({color: 0x00ffff, side: THREE.DoubleSide}), 0, 1)
    );
*/
scene.add(ground);



    // boxes 
    var box_material = Physijs.createMaterial(
        new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture( 'Images/crate.jpg' ) }),
        .4, // low friction
        .6 // high restitution
    );
for(var i = 0; i<3 ; i++){
    var box = new Physijs.BoxMesh(
        new THREE.BoxGeometry( 30, 30, 30 ),
        box_material,
        10 // mass
    );
    box.position.set(
        60*i+15,
        40,
        75
    );
    box.rotation.set(
        0,
        0,
        0
    );
    box.castShadow = true;
    scene.add( box );
objects.push(box);
}
objects.push(sphere);


 


    raycaster = new THREE.Raycaster();
   //raycaster.params.PointCloud.threshold = threshold;
   mouse = new THREE.Vector2();


    /* timer */
    last_time = timer.getTime();



    
    requestAnimationFrame(animate);
    
}
/*
function draw_sphere(){

    if(moveForward){
        // sphere.position.y += default_speed * timeDiff;
        // sphere.rotation.x += default_speed * timeDiff / radius;
        sphere.position.y += default_speed;
        var q = new THREE.Quaternion();
        q.setFromAxisAngle( new THREE.Vector3(1,0,0), -default_speed / radius ); 
        sphere.quaternion.multiplyQuaternions( q, sphere.quaternion );
    }
    
    if(moveBackward){
        sphere.position.y -= default_speed;
        var q = new THREE.Quaternion();
        q.setFromAxisAngle( new THREE.Vector3(1,0,0), +default_speed / radius ); 
        sphere.quaternion.multiplyQuaternions( q, sphere.quaternion );
    }

    if(moveLeft){
        sphere.position.x -= default_speed;

        var q = new THREE.Quaternion();
        q.setFromAxisAngle( new THREE.Vector3(0,1,0), -default_speed / radius ); 
        sphere.quaternion.multiplyQuaternions( q, sphere.quaternion );
    }

    if(moveRight){
        sphere.position.x += default_speed;

        var q = new THREE.Quaternion();
        q.setFromAxisAngle( new THREE.Vector3(0,1,0), +default_speed / radius ); 
        sphere.quaternion.multiplyQuaternions( q, sphere.quaternion );
    }

}

*/
function animate(){
	/* looping */
    //setTimeout(function() {
        requestAnimationFrame(animate);

        // timer
        current_time = timer.getTime();
        timeDiff = current_time - last_time;
        last_time = current_time;


    	/* User Control */
 //		trackBallControl.update();

/*
      
        sphere.__dirtyPosition = true;
        sphere.__dirtyRotation = true;
       
        draw_sphere();

*/

 scene.simulate();
    //select the mouse clicked object
    raycaster.setFromCamera( mouse, camera );
    var intersections = raycaster.intersectObjects( objects);
   var intersection = ( intersections.length ) > 0 ? intersections[ 0 ].object : null;
if(intersection) intersection.position.set(intersection.position.x, intersection.position.y + 20,intersection.position.z);



		/* refresh frame */
        renderer.autoClear = false;
        renderer.clear();
        renderer.render(backgroundScene , backgroundCamera );
        renderer.render(scene, camera);
        render_stats.update();
        keyboard.update();
    
    //}, 1000 / fps);    
}


