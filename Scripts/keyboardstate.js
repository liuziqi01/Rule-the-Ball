var CAMERA_FOCUS = new THREE.Vector3(0,0,0);
var ole_camera;
KeyboardState = function()
{	
	// bind keyEvents
	document.addEventListener("keydown", KeyboardState.onKeyDown, false);
	document.addEventListener("keyup",   KeyboardState.onKeyUp,   false);
	document.addEventListener("keyleft",   KeyboardState.onKeyLeft,   false);
	document.addEventListener("keyright",   KeyboardState.onKeyRight,   false);
	document.addEventListener('mousemove', onDocumentMouseMove, false );
	console.log("adding event listeners");

}

function onDocumentMouseMove( event ) {

	event.preventDefault();

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}



KeyboardState.k = 
{  
     8: "backspace",  9: "tab",       13: "enter",    16: "shift", 
    17: "ctrl",      18: "alt",       27: "esc",      32: "space",
    33: "pageup",    34: "pagedown",  35: "end",      36: "home",
    37: "left",      38: "up",        39: "right",    40: "down",
    45: "insert",    46: "delete",   186: ";",       187: "=",
   188: ",",        189: "-",        190: ".",       191: "/",
   219: "[",        220: "\\",       221: "]",       222: "'",

    48: "0",		 49: "1",		  50: "2",		  51: "3",	
    52: "4",		 53: "5",		  54: "6",		  55: "7",	
    56: "8",		 57: "9",		  65: "a",		  66: "b",	
    67: "c",		 68: "d",		  69: "e",		  70: "f",	
    71: "g",		 72: "h",		  73: "i",		  74: "j",	
    75: "k",		 76: "l",		  77: "m",		  78: "n",	
    79: "o",		 80: "p",		  81: "q",		  82: "r",	
    83: "s",		 84: "t",		  85: "u",		  86: "v",	
    87: "w",		 88: "x",		  89: "y",		  90: "z"    				
    			
}

KeyboardState.status = {};

KeyboardState.keyName = function ( keyCode )
{
	return ( KeyboardState.k[keyCode] != null ) ? 
		KeyboardState.k[keyCode] : 
		String.fromCharCode(keyCode);
}

KeyboardState.onKeyUp = function(event)
{
	var key = KeyboardState.keyName(event.keyCode);
	if ( KeyboardState.status[key] )
		KeyboardState.status[key].pressed = false;
}

KeyboardState.onKeyDown = function(event)
{
	var key = KeyboardState.keyName(event.keyCode);
	if ( !KeyboardState.status[key] )
		KeyboardState.status[key] = { down: false, pressed: false, up: false, updatedPreviously: false };
		rotSpeed = 0.05;
	
	var x = CAMERA.position.x,
    	y = CAMERA.position.y,
    	z = CAMERA.position.z;
	
	if(key == "left"){
        CAMERA.position.x = x * Math.cos(rotSpeed) + z * Math.sin(rotSpeed);
        CAMERA.position.z = z * Math.cos(rotSpeed) - x * Math.sin(rotSpeed);
   		CAMERA.lookAt( CAMERA_FOCUS );
	}
	if(key == "right") {
 		CAMERA.position.x = x * Math.cos(rotSpeed) - z * Math.sin(rotSpeed);
        CAMERA.position.z = z * Math.cos(rotSpeed) + x * Math.sin(rotSpeed);
 		CAMERA.lookAt( CAMERA_FOCUS );
	}
	
	if(key == "9") {
 		//CAMERA.position.x = x * 0.9;
	        CAMERA.position.set(x*0.9,y*0.9,z*0.9);
 		CAMERA.lookAt( CAMERA_FOCUS );
	}
	
	if(key == "0") {
        CAMERA.position.set(x*1.1,y*1.1,z*1.1);
 		CAMERA.lookAt( CAMERA_FOCUS );
	}
        if(key == "up") {
        CAMERA.position.set (x, y+ 10,z);
 		CAMERA.lookAt( CAMERA_FOCUS );
	}
    	if(key == "down") {
        CAMERA.position.set(x ,y - 10,z);
 		CAMERA.lookAt( CAMERA_FOCUS );
	}

    
        if(key == "r" && !simulation)
        {
	   
	    simulation = true;
	    ole_camera = CAMERA.position;
	   var temp = sphere.position;
    console.log(temp);
	     SCENE.remove(sphere);

       sphere_simulation = new Physijs.SphereMesh(
            new THREE.SphereGeometry( 13, 100, 100 ),
            new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture( 'Images/basketball.jpg') }),
            10 // mass
        );
	
        sphere_simulation.position.set(sphere.position.x,sphere.position.y+5,sphere.position.z);
	SCENE.add(sphere_simulation);
    CAMERA.position.set(sphere_simulation.position.x-50, sphere_simulation.position.y + 50,sphere_simulation.position.z);
    
    CAMERA.lookAt(sphere_simulation.position);

//SCENE.simulate();

	}
	      if(key == "d" && simulation)
    {
	sphere_simulation.setLinearVelocity(new THREE.Vector3(100,0,0));
    }
        if(key == "q" && simulation)
    {
	simulation = false;
	sphere_simulation.setLinearVelocity(new THREE.Vector3(0,0,0));
	SCENE.remove(sphere_simulation);
	SCENE.add(sphere);
/*
	CAMERA.position.set(ole_camera.posi.x,ole_camera.y,ole_camera.z);
	CAMERA.lookAt(CAMERA_FOCUS);
*/
	CAMERA.position.set (ole_camera.x,ole_camera.y,ole_camera.z);
	CAMERA.lookAt(CAMERA_FOCUS);
    }

       
}

KeyboardState.prototype.update = function()
{
	for (var key in KeyboardState.status)
	{
		// insure that every keypress has "down" status exactly once
		if ( !KeyboardState.status[key].updatedPreviously )
		{
			KeyboardState.status[key].down        		= true;
			KeyboardState.status[key].pressed     		= true;
			KeyboardState.status[key].updatedPreviously = true;
		}
		else // updated previously
		{
			KeyboardState.status[key].down = false;
		}

		// key has been flagged as "up" since last update
		if ( KeyboardState.status[key].up ) 
		{
			delete KeyboardState.status[key];
			continue; // move on to next key
		}
		
		if ( !KeyboardState.status[key].pressed ) // key released
			KeyboardState.status[key].up = true;
	}
}

KeyboardState.prototype.down = function(keyName)
{
	return (KeyboardState.status[keyName] && KeyboardState.status[keyName].down);
}

KeyboardState.prototype.pressed = function(keyName)
{
	return (KeyboardState.status[keyName] && KeyboardState.status[keyName].pressed);
}

KeyboardState.prototype.up = function(keyName)
{
	return (KeyboardState.status[keyName] && KeyboardState.status[keyName].up);
}

KeyboardState.prototype.debug = function()
{
	var list = "Keys active: ";
	for (var arg in KeyboardState.status)
		list += " " + arg
	console.log(list);
}

