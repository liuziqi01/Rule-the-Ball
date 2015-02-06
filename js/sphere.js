var container;

var camera, scene, renderer;
var cameraCube, sceneCube;

var mesh, lightMesh, geometry;
var spheres;

var directionalLight, pointLight;

var mouseX = 0;
var mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var angularSpeed = 0.2;
var lastTime = 0;


init();
animate();

function init() {
    
    container = document.createElement( 'div' );
    document.body.appendChild( container );
    
    
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    //renderer.autoClear = false;
    
    container.appendChild( renderer.domElement );
    
    
    
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 100000 );
    camera.position.z = 500;
    
    
    
    scene = new THREE.Scene();
    sceneCube = new THREE.Scene();
    
    geometry = new THREE.SphereGeometry( 150, 70, 70 );
    
    
    var materials = [
                     new THREE.MeshBasicMaterial( { color: 0xbbbbbb }) ,new THREE.MeshBasicMaterial( { color: 0xffff00 })]
    ;
    sphere = new THREE.Mesh( geometry, new THREE.MeshNormalMaterial(  ));
    sphere.transparent = true;
    sphere.opacity = 0.5;
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

