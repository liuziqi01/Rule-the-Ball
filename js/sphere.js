var container;

var camera, scene, renderer;

var controls;


var mesh, geometry;
var spheres;

var backgroundScene,backgroundCamera;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var angularSpeed = 0.2;
var lastTime = 0;
var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;
var canJump = true;

init();
animate();





function init() {
	/********************************************/
	/************** BASIC ELEMENTS **************/
	/********************************************/
    
    /* container setup */
    container = document.createElement( 'div' );
    container.setAttribute("id", "odie");
    document.body.appendChild( container );
	

	/* on screen text */
    var info = document.createElement('div');
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
    var texture = THREE.ImageUtils.loadTexture( 'image/starry-sky.jpg' );
    var backgroundMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(2, 2, 0),
        new THREE.MeshBasicMaterial({
            map: texture
        }));

    backgroundMesh .material.depthTest = false;
    backgroundMesh .material.depthWrite = false;

    // Create your background scene
    backgroundScene = new THREE.Scene();
    backgroundCamera = new THREE.Camera();
    backgroundScene .add(backgroundCamera );
    backgroundScene .add(backgroundMesh );
    

    /* camera setup */
	//Perspective Camera w/ Controls
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.set( 0, 0, 500 );


    /* Trackball Control setup */
  	controls = new THREE.TrackballControls( camera, renderer.domElement );
  	controls.minDistance = 200;
 	controls.maxDistance = 500;


 	/* Lights setup */

    scene.add( new THREE.AmbientLight( FireBrick ) );
    var light = new THREE.PointLight( White );
    light.position.copy( camera.position );
    scene.add( light );


    /* choose the keyboard layout ..... =_= */

    
    
   
   	/*************************************/
	/************** Objcets **************/
	/*************************************/ 
    

    /* sphere */
    geometry = new THREE.SphereGeometry( 50, 10, 10 );		// radius, widthSegments, heightSegments
    sphere = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( {color:Yellow} ) ); // Basic | Depth | Face | Lambert | Normal | Phong 
  	sphere.rotation.x = Math.PI * 0.1;
  	// what's this???
    //sphere.overdraw = true;
	sphere.position.x = 5;
	sphere.position.y = 5;
	sphere.position.z = 30;
 	scene.add( sphere );

 	/* plane */
	var plane = new THREE.Mesh(new THREE.PlaneGeometry(300, 300), new THREE.MeshNormalMaterial());
	//plane.overdraw = true;
	scene.add(plane);



	var onKeyDown = function ( event ) {

				switch ( event.keyCode ) {

					case 38: // up
					case 87: // w
						moveForward = true;
						break;

					case 37: // left
					case 65: // a
						moveLeft = true; break;

					case 40: // down
					case 83: // s
						moveBackward = true;
						break;

					case 39: // right
					case 68: // d
						moveRight = true;
						break;
				    
					case 32: // space
						if ( canJump == true ) 
							{sphere.position.z += 20;}
						canJump = false;
						break;
						

				}
    
};

	var onKeyUp = function ( event ) {

					switch( event.keyCode ) {

						case 38: // up
						case 87: // w
							moveForward = false;
							break;

						case 37: // left
						case 65: // a
							moveLeft = false;
							break;

						case 40: // down
						case 83: // s
							moveBackward = false;
							break;

						case 39: // right
						case 68: // d
							moveRight = false;
							break;

					case 32: // space
						
					    sphere.position.z -= 19;
						canJump = true;
							break;
					       
					}

				};

				document.addEventListener( 'keydown', onKeyDown, false );
				document.addEventListener( 'keyup', onKeyUp, false );

				var val = getRadioVal( document.getElementById('myForm'), 'keyboard_layout' );
				alert(val);
}

function animate(){
    // update rotating
 /*   var time = (new Date()).getTime();
    var timeDiff = time - lastTime;
    var angleChange = angularSpeed * timeDiff  * Math.PI / 1000;
    sphere.rotation.y += angleChange;
    lastTime = time;
    */
 controls.update();
   

		if ( moveForward ) sphere.position.y ++;
					if ( moveBackward )sphere.position.y --;

					if ( moveLeft ) sphere.position.x --;
					if ( moveRight ) sphere.position.x++;
    console.log("I'm moving");
    // request new frame

	renderer.autoClear = false;
    renderer.clear();
    renderer.render(backgroundScene , backgroundCamera );
 	
 	renderer.render(scene, camera);

    requestAnimationFrame(function(){
                          animate();
                          });
      
}




   	/*******************************************/
	/************** under tuning  **************/
	/*******************************************/ 

function getRadioVal(form, name) {
    var val;
    // get list of radio buttons with specified name
    var radios = form.elements[name];
    
    // loop through list of radio buttons
    for (var i=0, len=radios.length; i<len; i++) {
        if ( radios[i].checked ) { 
            val = radios[i].value; 
            break; 
        }
    }
    return val; 
}
