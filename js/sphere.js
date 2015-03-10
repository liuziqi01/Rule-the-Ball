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
    
    container = document.createElement( 'div' );
    container.setAttribute("id", "odie");
    document.body.appendChild( container );
    //create a container as a space for the animation
   //container.style.backgroundColor = "lightblue";
    renderer = new THREE.WebGLRenderer();
     //renderer.setClearColor( 0xffffff, 1);
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    //renderer.autoClear = false
    //create a renderer
    
 scene = new THREE.Scene();


    container.appendChild( renderer.domElement );
    //append the renderer to the website
    

//Perspective Camera w/ Controls
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.set( 0, 0, 500 );

  controls = new THREE.TrackballControls( camera, renderer.domElement );
  controls.minDistance = 200;
  controls.maxDistance = 500;

    scene.add( new THREE.AmbientLight( 0x222222 ) );

   var light = new THREE.PointLight( 0xffffff );
   light.position.copy( camera.position );
    scene.add( light );

    
    
   
    
    
    geometry = new THREE.SphereGeometry( 50, 10, 10 );
     sphere = new THREE.Mesh( geometry, new THREE.MeshNormalMaterial(  ));
  sphere.rotation.x = Math.PI * 0.1;
    sphere.overdraw = true;
sphere.position.x = 5;
sphere.position.y = 5;
sphere.position.z = 30;
 scene.add( sphere );


var plane = new THREE.Mesh(new THREE.PlaneGeometry(300, 300), new THREE.MeshNormalMaterial());
//plane.overdraw = true;
scene.add(plane);


  // Load the background texture
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
   
//render.render(backgroundScene,backgroundCamera);
  //  renderer.render(scene, camera);


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


//

