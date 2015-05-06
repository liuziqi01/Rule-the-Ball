/* some gobal variables need to declare first in strict mode */

var FPS = 60; // max = 60 as limited by the requestAnimationFrame()

var SPACE_SIZE = 12; // the game field is a $SPACE_SIZE by $SPACE_SIZE by $SPACE_SIZE cube. and make sure this is always an even number
// and note the range of the coordinate is [0, SPACE_SIZE - 1]

var UNIT_STEP = 30; // the edge length of each unit box



Physijs.scripts.worker = '/Script/physijs_worker.js';
Physijs.scripts.ammo = '/Script/ammo.js';
