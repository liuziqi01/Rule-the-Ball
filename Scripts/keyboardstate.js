var CAMERA_FOCUS = new THREE.Vector3(0, 0, 0);
var ole_camera;

KeyboardState = function() {
    // bind keyEvents
    document.addEventListener("keydown", KeyboardState.onKeyDown, false);
    document.addEventListener("keyup", KeyboardState.onKeyUp, false);
    document.addEventListener("keyleft", KeyboardState.onKeyLeft, false);
    document.addEventListener("keyright", KeyboardState.onKeyRight, false);
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

KeyboardState.keyName = function(keyCode) {
    return (KeyboardState.k[keyCode] != null) ?
        KeyboardState.k[keyCode] :
        String.fromCharCode(keyCode);
}

KeyboardState.onKeyUp = function(event) {
    var key = KeyboardState.keyName(event.keyCode);
    if (KeyboardState.status[key])
        KeyboardState.status[key].pressed = false;
}

KeyboardState.onKeyDown = function(event) {
    var key = KeyboardState.keyName(event.keyCode);
    if (!KeyboardState.status[key])
        KeyboardState.status[key] = {
            down: false,
            pressed: false,
            up: false,
            updatedPreviously: false
        };
    onKeyDown(key);
}

KeyboardState.prototype.update = function() {
    for (var key in KeyboardState.status) {
        // insure that every keypress has "down" status exactly once
        if (!KeyboardState.status[key].updatedPreviously) {
            KeyboardState.status[key].down = true;
            KeyboardState.status[key].pressed = true;
            KeyboardState.status[key].updatedPreviously = true;
        } else // updated previously
        {
            KeyboardState.status[key].down = false;
        }

        // key has been flagged as "up" since last update
        if (KeyboardState.status[key].up) {
            delete KeyboardState.status[key];
            continue; // move on to next key
        }

        if (!KeyboardState.status[key].pressed) // key released
            KeyboardState.status[key].up = true;
    }
}

KeyboardState.prototype.down = function(keyName) {
    return (KeyboardState.status[keyName] && KeyboardState.status[keyName].down);
}

KeyboardState.prototype.pressed = function(keyName) {
    return (KeyboardState.status[keyName] && KeyboardState.status[keyName].pressed);
}

KeyboardState.prototype.up = function(keyName) {
    return (KeyboardState.status[keyName] && KeyboardState.status[keyName].up);
}

KeyboardState.prototype.debug = function() {
    var list = "Keys active: ";
    for (var arg in KeyboardState.status)
        list += " " + arg
    console.log(list);
}



