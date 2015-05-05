/* some gobal variables need to declare first in strict mode */

var FPS = 60; // max = 60 as limited by the requestAnimationFrame()

var SPACE_SIZE = 12; // the game field is a $SPACE_SIZE by $SPACE_SIZE by $SPACE_SIZE cube. and make sure this is always an even number
// and note the range of the coordinate is [0, SPACE_SIZE - 1]

var UNIT_STEP = 30; // the edge length of each unit box

var BOX_DEFAULT_TEXTURE = 'Images/crate.jpg';
var SPHERE_DEFAULT_TEXTURE = 'Images/basketball.jpg'

var radius = 10;

var default_speed = 2 // pixels per ms

var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;
var canJump = true;
var MOUSE_CLICK = false;

Physijs.scripts.worker = '/Script/physijs_worker.js';
Physijs.scripts.ammo = '/Script/ammo.js';
