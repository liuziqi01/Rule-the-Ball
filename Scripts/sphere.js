var fps = 60; // max = 60 as limited by the requestAnimationFrame()


/* timing */
// the scale of the return value is ms
var timer = new Date();
var current_time = 0;
var last_time = 0;
var timeDiff = 0;

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

var angularPos = {      // this is the absolute angular position
    x : 0,
    y : 0,
    z : 0
}

var default_speed = 2 // pixels per ms

var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;
var canJump = true;


var keyboardState;


init();
animate();


function init() {
	/********************************************/
	/************** BASIC ELEMENTS **************/
	/********************************************/

	/* validate the fps */
	if (fps > 60){
		fps = 60;
	}

    
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
    scene = new THREE.Scene();

    /* background setup */
	//THREE.ImageUtils.crossOrigin = '';

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
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.set( 0, 0, 600 );


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

        


   	/*************************************/
	/************** Objcets **************/
	/*************************************/ 
    

    /* sphere */
    geometry = new THREE.SphereGeometry(radius, 100, 100 );		// radius, widthSegments, heightSegments
    sphere = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture('Images/basketball.jpg')} ) ); // Basic | Depth | Face | Lambert | Normal | Phong 
    //sphere.overdraw = true;
    sphere.rotation.x = 0;
    sphere.rotation.y = 0;
    sphere.rotation.z = 0;

	sphere.position.x = 0;
	sphere.position.y = 0;
	sphere.position.z = radius + 2.5;
 	scene.add( sphere );

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
    var cube = new THREE.Mesh(new THREE.CubeGeometry(94 * 7, 50 * 7, 5), new THREE.MeshFaceMaterial(cube_materials));
    //cube.overdraw = true;
    cube.position.x = 0;
    cube.position.y = 0;
    cube.position.z = 0;
    scene.add(cube);
 

	/* keyboard control listener setup */
	document.addEventListener('keydown', onKeyDown);          //(event, function, useCapture)
	document.addEventListener('keyup', onKeyUp);

    /* timer */
    last_time = timer.getTime();

}

function rotateAroundWorldAxis( object, axis, radians ) {

    var rotationMatrix = new THREE.Matrix4();

    rotationMatrix.makeRotationAxis( axis.normalize(), radians );
    rotationMatrix.multiplySelf( object.matrix );                       // pre-multiply
    object.matrix = rotationMatrix;
    //object.rotation.setEulerFromRotationMatrix( object.matrix );
    object.rotation.setFromRotationMatrix(object.matrix);
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
    setTimeout(function() {
        requestAnimationFrame(animate);

        // timer
        current_time = timer.getTime();
        timeDiff = current_time - last_time;
        last_time = current_time;


    	/* User Control */
 		trackBallControl.update();


        /* drawings */
        draw_sphere();
        //sphere.rotation.x = sphere.rotation.x + 1/3;
        //sphere.rotation.y = sphere.rotation.y + 1/3;

    	

		/* refresh frame */
		renderer.autoClear = false;
    	renderer.clear();
    	renderer.render(backgroundScene , backgroundCamera );
 		renderer.render(scene, camera);



    
    }, 1000 / fps);    
}


