var fps = 60; // max = 60 as limited by the requestAnimationFrame()

'use strict';

Physijs.scripts.worker = './physijs_worker.js';
Physijs.scripts.ammo = './ammo.js';


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


/* objects state value */
var radius = 10;

var default_speed = 2 // pixels per ms

var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;
var canJump = true;


var keyboardState;


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


    /* scene setup */
    // scene = new THREE.Scene();


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
    scene.setGravity(new THREE.Vector3( 0, 0, -30 ));
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
            map: THREE.ImageUtils.loadTexture( 'Images/sky.jpg')
        }));

    backgroundMesh.material.depthTest = false;
    backgroundMesh.material.depthWrite = false;
    backgroundScene = new THREE.Scene();
    backgroundCamera = new THREE.Camera();
    backgroundScene.add(backgroundCamera );
    backgroundScene.add(backgroundMesh );
    

    /* camera setup */
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.set( 0, -600, 300 );
    camera.lookAt(new THREE.Vector3(0,0,0));


    /* Trackball Control setup */
  	trackBallControl = new THREE.TrackballControls( camera, renderer.domElement );
  	trackBallControl.minDistance = 200;
 	trackBallControl.maxDistance = 500;


 	/* Lights setup */
    scene.add( new THREE.AmbientLight( White ) );

    // the point light following the camera
    // var light = new THREE.PointLight( White );
    // light.position.copy( camera.position );
    // scene.add( light );


    /* keyboard layout setup */
    var keyboardLayout = document.getElementById("keyboard_layout_us");
	keyboardState = keyboardLayout.checked;


	/************** Objcets **************/

    /* sphere */
 //    geometry = new THREE.SphereGeometry(radius, 100, 100 );		// radius, widthSegments, heightSegments
 //    sphere = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture('Images/basketball.jpg')} ) ); // Basic | Depth | Face | Lambert | Normal | Phong 
 //    //sphere.overdraw = true;
 //    sphere.rotation.x = 0;
 //    sphere.rotation.y = 0;
 //    sphere.rotation.z = 0;

	// sphere.position.x = 0;
	// sphere.position.y = 0;
	// sphere.position.z = radius + 2.5;
 // 	scene.add( sphere );

    var sphere_material = Physijs.createMaterial(
        new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture( 'Images/basketball.jpg' ) }),
        .4, // low friction
        .6 // high restitution
    );

    sphere = new Physijs.SphereMesh(
        new THREE.SphereGeometry( radius, 100, 100 ),
        sphere_material,
        10 // mass
    );
    sphere.position.set(
        0,
        0,
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

 	/* plane */
	//var plane = new THREE.Mesh(new THREE.PlaneGeometry(300, 300), new THREE.MeshLambertMaterial({color:Yellow}));
	//plane.overdraw = true;
	//scene.add(plane);


    /* cube */

    var cube_materials = [
       new THREE.MeshLambertMaterial({
           map: THREE.ImageUtils.loadTexture('Images/basketball_court_floor.jpg') // +x
       }),
       new THREE.MeshLambertMaterial({
           map: THREE.ImageUtils.loadTexture('Images/basketball_court_floor.jpg') // -x
       }),
       new THREE.MeshLambertMaterial({
           map: THREE.ImageUtils.loadTexture('Images/basketball_court_floor.jpg') // +y
       }),
       new THREE.MeshLambertMaterial({
           map: THREE.ImageUtils.loadTexture('Images/basketball_court_floor.jpg') // -y
       }),
       new THREE.MeshLambertMaterial({
           map: THREE.ImageUtils.loadTexture('Images/basketballcourt.png') // +z
       }),
       new THREE.MeshLambertMaterial({
           map: THREE.ImageUtils.loadTexture('Images/basketball_court_floor.jpg') // -z
       })
    ];

    // var material = new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture('Images/basketball_court.png')});
    // var cube = new THREE.Mesh(new THREE.CubeGeometry(94 * 7, 50 * 7, 5), new THREE.MeshFaceMaterial(cube_materials));
    // //cube.overdraw = true;
    // cube.position.x = 0;
    // cube.position.y = 0;
    // cube.position.z = 0;
    // scene.add(cube);

    // physics ground
    var ground_material = Physijs.createMaterial(
        //new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture( 'Images/basketball_court_floor.jpg' ) }),
        new THREE.MeshFaceMaterial(cube_materials),
        .8, // high friction
        .4 // low restitution
    );
   // ground_material.map.wrapS = ground_material.map.wrapT = THREE.RepeatWrapping;
    // what did the following do...
    //ground_material.map.repeat.set( 3, 3 );
    
    
    // Ground
    ground = new Physijs.BoxMesh(
        new THREE.BoxGeometry(94 * 7, 50 * 7 , 5),
        ground_material,
        0 // mass
    );
    ground.receiveShadow = true;
    scene.add( ground );


    // boxes 
    var box_material = Physijs.createMaterial(
        new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture( 'Images/crate.jpg' ) }),
        .4, // low friction
        .6 // high restitution
    );

    var box = new Physijs.BoxMesh(
        new THREE.BoxGeometry( 20, 20, 20 ),
        box_material,
        10 // mass
    );
    box.position.set(
        30,
        30,
        90
    );
    box.rotation.set(
        0,
        0,
        0
    );
    box.castShadow = true;
    scene.add( box );
    //box.push( box );
 

	/* keyboard control listener setup */
	document.addEventListener('keydown', onKeyDown);          //(event, function, useCapture)
	document.addEventListener('keyup', onKeyUp);

    /* timer */
    last_time = timer.getTime();



    
    requestAnimationFrame(animate);
    
}

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

function animate(){
	/* looping */
    //setTimeout(function() {
        requestAnimationFrame(animate);

        // timer
        current_time = timer.getTime();
        timeDiff = current_time - last_time;
        last_time = current_time;


    	/* User Control */
 		trackBallControl.update();


        /* drawings */
        sphere.__dirtyPosition = true;
        sphere.__dirtyRotation = true;
        scene.simulate();
        draw_sphere();

		/* refresh frame */
        renderer.autoClear = false;
        renderer.clear();
        renderer.render(backgroundScene , backgroundCamera );
        renderer.render(scene, camera);
        render_stats.update();
    
    //}, 1000 / fps);    
}


