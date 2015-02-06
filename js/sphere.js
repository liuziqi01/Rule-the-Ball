var container;

var camera, scene, renderer;


var mesh, geometry;
var spheres;


var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var angularSpeed = 0.2;
var lastTime = 0;


init();
animate();

function init() {
    
    container = document.createElement( 'div' );
    document.body.appendChild( container );
    //create a container as a space for the animation
    
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    //renderer.autoClear = false
    //create a renderer
    
    container.appendChild( renderer.domElement );
    //append the renderer to the website
    
    
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 100000 );
    camera.position.z = 500;
    
    
    
    scene = new THREE.Scene();
    
    
    geometry = new THREE.SphereGeometry( 150, 70, 70 );
    
    
     sphere = new THREE.Mesh( geometry, new THREE.MeshNormalMaterial(  ));
 
    sphere.rotation.x = Math.PI * 0.1;
    sphere.overdraw = true;
    scene.add( sphere );
    renderer.render(scene, camera);
    
}



function animate(){
    // update
    var time = (new Date()).getTime();
    var timeDiff = time - lastTime;
    var angleChange = angularSpeed * timeDiff  * Math.PI / 1000;
    sphere.rotation.y += angleChange;
    lastTime = time;
    
    // render
    renderer.render(scene, camera);
    console.log("I'm moving");
    // request new frame
    requestAnimationFrame(function(){
                          animate();
                          });
    
    
}


//

