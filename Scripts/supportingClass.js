/* OBJECT Constructors */
// (0, 0, 0) is the intersection point of three edges, so it isn't within any of the cubes

/* this class assigns three input value directly to the three coordinates */
var absCoordinate = function(x, y, z) {
    x = typeof x !== 'undefined' ? x : 0;
    y = typeof y !== 'undefined' ? y : 0;
    z = typeof z !== 'undefined' ? z : 0;

    if (x < -SPACE_SIZE / 2 * UNIT_STEP) x = -SPACE_SIZE / 2 * UNIT_STEP;
    if (x > SPACE_SIZE / 2 * UNIT_STEP) x = SPACE_SIZE / 2 * UNIT_STEP;
    if (y < -SPACE_SIZE / 2 * UNIT_STEP) y = -SPACE_SIZE / 2 * UNIT_STEP;
    if (y > SPACE_SIZE / 2 * UNIT_STEP) y = SPACE_SIZE / 2 * UNIT_STEP;
    if (z < -SPACE_SIZE / 2 * UNIT_STEP) z = -SPACE_SIZE / 2 * UNIT_STEP;
    if (z > SPACE_SIZE / 2 * UNIT_STEP) z = SPACE_SIZE / 2 * UNIT_STEP;
    this.x = x;
    this.y = y;
    this.z = z;
}

/* this method takes in the abs position */
absCoordinate.prototype.setbyAbs = function(x, y, z) {
    x = typeof x !== 'undefined' ? x : 0;
    y = typeof y !== 'undefined' ? y : 0;
    z = typeof z !== 'undefined' ? z : 0;
    if (x < -SPACE_SIZE / 2 * UNIT_STEP) x = -SPACE_SIZE / 2 * UNIT_STEP;
    if (x > SPACE_SIZE / 2 * UNIT_STEP) x = SPACE_SIZE / 2 * UNIT_STEP;
    if (y < -SPACE_SIZE / 2 * UNIT_STEP) y = -SPACE_SIZE / 2 * UNIT_STEP;
    if (y > SPACE_SIZE / 2 * UNIT_STEP) y = SPACE_SIZE / 2 * UNIT_STEP;
    if (z < -SPACE_SIZE / 2 * UNIT_STEP) z = -SPACE_SIZE / 2 * UNIT_STEP;
    if (z > SPACE_SIZE / 2 * UNIT_STEP) z = SPACE_SIZE / 2 * UNIT_STEP;

    this.x = x;
    this.y = y;
    this.z = z;

}

/* this method takes in the in game position and convert it to the abs position  */
absCoordinate.prototype.setbyInGame = function(x, y, z) {
    x = typeof x !== 'undefined' ? x : 0;
    y = typeof y !== 'undefined' ? y : 0;
    z = typeof z !== 'undefined' ? z : 0;

    if (x < 0) x = 0;
    if (x > SPACE_SIZE - 1) x = SPACE_SIZE - 1;
    if (y < 0) y = 0;
    if (y > SPACE_SIZE - 1) y = SPACE_SIZE - 1;
    if (z < 0) z = 0;
    if (z > SPACE_SIZE - 1) z = SPACE_SIZE - 1;

    this.x = (x - SPACE_SIZE / 2 + 0.5) * UNIT_STEP;
    this.y = (y - SPACE_SIZE / 2 + 0.5) * UNIT_STEP;
    this.z = (z - SPACE_SIZE / 2 + 0.5) * UNIT_STEP;

}


/* this class takes in three input values and convert them to the in game coordinate */
var inGameCoordinate = function(x, y, z) {
    x = typeof x !== 'undefined' ? x : 0;
    y = typeof y !== 'undefined' ? y : 0;
    z = typeof z !== 'undefined' ? z : 0;

    if (x < 0) x = 0;
    if (x > SPACE_SIZE - 1) x = SPACE_SIZE - 1;
    if (y < 0) y = 0;
    if (y > SPACE_SIZE - 1) y = SPACE_SIZE - 1;
    if (z < 0) z = 0;
    if (z > SPACE_SIZE - 1) z = SPACE_SIZE - 1;

    this.x = parseInt(x);
    this.y = parseInt(y);
    this.z = parseInt(z);
}

inGameCoordinate.prototype.setbyAbs = function(x, y, z) {
    x = typeof x !== 'undefined' ? x : 0;
    y = typeof y !== 'undefined' ? y : 0;
    z = typeof z !== 'undefined' ? z : 0;

    if (x < -SPACE_SIZE / 2 * UNIT_STEP) x = -SPACE_SIZE / 2 * UNIT_STEP;
    if (x > SPACE_SIZE / 2 * UNIT_STEP) x = SPACE_SIZE / 2 * UNIT_STEP;
    if (y < -SPACE_SIZE / 2 * UNIT_STEP) y = -SPACE_SIZE / 2 * UNIT_STEP;
    if (y > SPACE_SIZE / 2 * UNIT_STEP) y = SPACE_SIZE / 2 * UNIT_STEP;
    if (z < -SPACE_SIZE / 2 * UNIT_STEP) z = -SPACE_SIZE / 2 * UNIT_STEP;
    if (z > SPACE_SIZE / 2 * UNIT_STEP) z = SPACE_SIZE / 2 * UNIT_STEP;


    x += SPACE_SIZE / 2 * UNIT_STEP;
    y += SPACE_SIZE / 2 * UNIT_STEP;
    z += SPACE_SIZE / 2 * UNIT_STEP;

    if (x % UNIT_STEP) this.x = parseInt(x / UNIT_STEP); // if the point is not on the edge
    else if (!x) this.x = parseInt(x / UNIT_STEP) - 1; // if the point is on the edge
    else this.x = 0; // if the point is at origin
    if (y % UNIT_STEP) this.y = parseInt(y / UNIT_STEP);
    else if (!y) this.y = parseInt(y / UNIT_STEP) - 1;
    else this.y = 0;
    if (z % UNIT_STEP) this.z = parseInt(z / UNIT_STEP);
    else if (!z) this.z = parseInt(z / UNIT_STEP) - 1;
    else this.z = 0;
}

inGameCoordinate.prototype.setbyInGame = function(x, y, z) {
    this.x = parseInt(x);
    this.y = parseInt(y);
    this.z = parseInt(z);
}


var atomicElement = function(abspos, category, type, para1, para2, para3) {
    /*para definitions*/
    /*  box : para1 -> x, para2 -> y, para3 -> z
        sphere : para1 -> r
        cylinder : para1 -> r, para2 -> h
    */

    if (category === "box" && (typeof para1 === 'undefined' || typeof para2 === 'undefined' || typeof para3 === 'undefined')) {
        console.error(" creating atomicbox somewhere but lack parameters");
    }
    if (category === "sphere" && (typeof para1 === 'undefined')) {
        console.error(" creating atomicsphere somewhere but lack parameters");
    }
    if (category === "cylinder" && (typeof para1 === 'undefined' || typeof para2 === 'undefined')) {
        console.error(" creating atomiccylinder somewhere but lack parameters");
    }


    if (category === "box") {
        switch (type) {
            case 0:
                var material = Physijs.createMaterial(
                    new THREE.MeshLambertMaterial({
                        map: THREE.ImageUtils.loadTexture('Images/crate.jpg')
                    }),
                    1, // friction coefficient
                    .0 // e
                );
                break;
            case 1:
                var material = Physijs.createMaterial(
                    new THREE.MeshLambertMaterial({
                        map: THREE.ImageUtils.loadTexture('Images/diamondTexture.png')
                    }),
                    1, // friction coefficient
                    .0 // e
                );
                break;
            case 2:
                var material = Physijs.createMaterial(
                    new THREE.MeshLambertMaterial({
                        map: THREE.ImageUtils.loadTexture('Images/goldTexture.png')
                    }),
                    1, // friction coefficient
                    .0 // e
                );
                break;
        }
        Physijs.BoxMesh.call(this,
            new THREE.BoxGeometry(para1, para2, para3),
            material,
            0 // mass
        );
    }
    
    

    if (category === "sphere") {

        var material = Physijs.createMaterial(
            new THREE.MeshLambertMaterial({
                map: THREE.ImageUtils.loadTexture('Images/RockSmooth.jpg')
            }),
            1, // friction coefficient
            .0 // e
        );
        Physijs.SphereMesh.call(this,
            new THREE.SphereGeometry(para1, para1 * 8, para1 * 8),
            material,
            0 // mass
        );

    }

    if (category === "cylinder") {
        var material = Physijs.createMaterial(
            new THREE.MeshLambertMaterial({
                map: THREE.ImageUtils.loadTexture('Images/RockSmooth.jpg')
            }),
            1, // friction coefficient
            .0 // e
        );

        Physijs.CapsuleMesh.call(this,
            new THREE.CylinderGeometry(para1, para1, para2, para1 * 8), // top radius, bottom radius, height, segments
            material,
            0 // mass
        );


    }

    this.position.set(abspos.x, abspos.y, abspos.z);
}

atomicElement.prototype = new Physijs.Mesh;
atomicElement.prototype.constructor = atomicElement;



var gameElement = function(ingamepos, category, type) {
    var abspos = new absCoordinate(0, 0, 0);
    abspos.setbyInGame(ingamepos.x, ingamepos.y, ingamepos.z);

    if (category === "box") {
        atomicElement.call(this, abspos, category, type, UNIT_STEP, UNIT_STEP, UNIT_STEP);
        if(type==2)
            var handleCollision = function(collided_with, linearVelocity, angularVelocity) {
                collided_with.setLinearVelocity(collided_with.getLinearVelocity().multiplyScalar(1.1));
            };
        this.addEventListener('collision', handleCollision);
    } else if (category === "sphere") {
        atomicElement.call(this, abspos, category, type, 13);
    } else if (category === "cylinder") {
        atomicElement.call(this, abspos, category, type, UNIT_STEP, UNIT_STEP, UNIT_STEP);
    } else if (category === "stair") {

    } else if (category === "startingPoint") {
        Physijs.BoxMesh.call(this,
            new THREE.BoxGeometry(UNIT_STEP, UNIT_STEP, UNIT_STEP),
            new THREE.MeshBasicMaterial({
                color: Yellow,
                opacity: 0.5,
                transparent: true
            }),
            0 // mass
        );
        this.position.set(abspos.x, abspos.y, abspos.z);


    } else if (category === "endingPoint") {
        Physijs.BoxMesh.call(this,
            new THREE.BoxGeometry(UNIT_STEP, UNIT_STEP, UNIT_STEP),
            new THREE.MeshBasicMaterial({
                color: Green,
                opacity: 0.5,
                transparent: true
            }),
            0);
        this.position.set(abspos.x, abspos.y, abspos.z);
    } else if (category === "gameBall") {
        Physijs.SphereMesh.call(this,
            new THREE.SphereGeometry(UNIT_STEP * 1 / 3, 10, 10),
            Physijs.createMaterial(
                new THREE.MeshLambertMaterial({
                    map: THREE.ImageUtils.loadTexture('Images/basketball.jpg')
                }),
                1, // friction coefficient
                0.4 // e
            ),
            10);
        this.position.set(abspos.x, abspos.y, abspos.z);
    } else if (category === "wall") {
        Physijs.Mesh.call(this,
            new THREE.BoxGeometry(UNIT_STEP * 4, UNIT_STEP * 4, UNIT_STEP),
            new THREE.MeshLambertMaterial({
                map: THREE.ImageUtils.loadTexture('Images/RocksArid.jpg')
            }));
        this.position.set(abspos.x + UNIT_STEP * 3 / 2, abspos.y + UNIT_STEP * 3 / 2, abspos.z);
    } else if (category === "posholder") {
        Physijs.Mesh.call(this,
            new THREE.BoxGeometry(UNIT_STEP, UNIT_STEP, UNIT_STEP), new THREE.MeshBasicMaterial({
                color: Red,
                opacity: 0.5,
                transparent: true
            })
        );
        this.position.set(abspos.x, abspos.y, abspos.z);
    } else if (category === "ground") {
        Physijs.BoxMesh.call(this,
            new THREE.BoxGeometry(SPACE_SIZE * UNIT_STEP, 3, SPACE_SIZE * UNIT_STEP),
            Physijs.createMaterial(new THREE.MeshBasicMaterial({
                color: White,
                opacity: 0.7,
                transparent: true
            }), 1, 1),
            0);
        this.position.set(0, (0 - SPACE_SIZE / 2) * UNIT_STEP, 0);
        this.receiveShadow = true;
    } else if (category === "track") {
        var jsonLoader = new THREE.JSONLoader();

        jsonLoader.load("model/woodtrail.js", function(g) {
            console.log("nice");
            NIMA = g;
        });
        Physijs.ConcaveMesh.call(this,
            NIMA,
            // new THREE.BoxGeometry( UNIT_STEP, UNIT_STEP,  UNIT_STEP),
            Physijs.createMaterial(new THREE.MeshBasicMaterial({
                map: THREE.ImageUtils.loadTexture('Images/RockSmooth.jpg'),
                transparent: false
            }), 0, 1),
            0);
        this.castShadow = true;
        this.receiveShadow = true;
        this.scale.set(15, 10, 14);
        this.position.set(abspos.x, abspos.y - 5, abspos.z);
        switch (type) {
            case 1:
                this.rotation.set(0, Math.PI / 2, 0);
                break;
        }

    }

}

gameElement.prototype = new Physijs.Mesh;
gameElement.prototype.constructor = gameElement;
gameElement.prototype.activate = function() {
    this.setLinearFactor(new THREE.Vector3(1, 1, 1));
    this.setAngularFactor(new THREE.Vector3(1, 1, 1));
    SCENE.simulate();
}
gameElement.prototype.freeze = function() {
    this.setLinearFactor(new THREE.Vector3(0, 0, 0));
    this.setAngularFactor(new THREE.Vector3(0, 0, 0));
    SCENE.simulate();
}








// function draw_sphere(){

//     if(moveForward){
//         // sphere.position.y += default_speed * timeDiff;
//         // sphere.rotation.x += default_speed * timeDiff / radius;
//         sphere.position.y += default_speed;
//         var q = new THREE.Quaternion();
//         q.setFromAxisAngle( new THREE.Vector3(1,0,0), -default_speed / radius ); 
//         sphere.quaternion.multiplyQuaternions( q, sphere.quaternion );
//     }

//     if(moveBackward){
//         sphere.position.y -= default_speed;
//         var q = new THREE.Quaternion();
//         q.setFromAxisAngle( new THREE.Vector3(1,0,0), +default_speed / radius ); 
//         sphere.quaternion.multiplyQuaternions( q, sphere.quaternion );
//     }

//     if(moveLeft){
//         sphere.position.x -= default_speed;

//         var q = new THREE.Quaternion();
//         q.setFromAxisAngle( new THREE.Vector3(0,1,0), -default_speed / radius ); 
//         sphere.quaternion.multiplyQuaternions( q, sphere.quaternion );
//     }

//     if(moveRight){
//         sphere.position.x += default_speed;

//         var q = new THREE.Quaternion();
//         q.setFromAxisAngle( new THREE.Vector3(0,1,0), +default_speed / radius ); 
//         sphere.quaternion.multiplyQuaternions( q, sphere.quaternion );
//     }

// }

function addJson(ingamepos, type) {
    if (type == 0) {

        var jsonLoader = new THREE.JSONLoader();
        jsonLoader.load("model/woodtrail.js", addModelToScene0);

        var abspos = new absCoordinate(0, 0, 0);
        abspos.setbyInGame(ingamepos.x, ingamepos.y, ingamepos.z);

        function addModelToScene0(geometry) {
            var android = new Physijs.ConcaveMesh(
                geometry,
                Physijs.createMaterial(new THREE.MeshBasicMaterial({
                    map: THREE.ImageUtils.loadTexture('Images/wood.jpg'),
                    transparent: false
                }), 0, 0),
                0);
            android.castShadow = true;
            android.receiveShadow = true;
            android.scale.set(15, 10, 14);
            android.position.set(abspos.x, abspos.y - 5, abspos.z);
            android.rotation.set(0, 0, 0);
            SCENE.add(android);

        }
    } else if (type == 1) {

        var jsonLoader = new THREE.JSONLoader();
        jsonLoader.load("model/woodtrail.js", addModelToScene1);

        var abspos = new absCoordinate(0, 0, 0);
        abspos.setbyInGame(ingamepos.x, ingamepos.y, ingamepos.z);

        function addModelToScene1(geometry) {
            var android = new Physijs.ConcaveMesh(
                geometry,
                Physijs.createMaterial(new THREE.MeshBasicMaterial({
                    map: THREE.ImageUtils.loadTexture('Images/RockSmooth.jpg'),
                    transparent: false
                }), 0, 1),
                0);
            android.castShadow = true;
            android.receiveShadow = true;
            android.scale.set(15, 10, 14);
            android.position.set(abspos.x, abspos.y - 5, abspos.z);
            android.rotation.set(0, Math.PI / 2, 0);
            SCENE.add(android);
        }


    } else if (type == 2) {
        var jsonLoader = new THREE.JSONLoader();
        jsonLoader.load("model/sponge.js", addModelToScene2);

        var abspos = new absCoordinate(0, 0, 0);
        abspos.setbyInGame(ingamepos.x, ingamepos.y, ingamepos.z);

        function addModelToScene2(geometry) {
            var android = new Physijs.ConcaveMesh(
                geometry,
                Physijs.createMaterial(new THREE.MeshNormalMaterial({
                    transparent: false
                }), 0, 1),
                0);
            android.castShadow = true;
            android.receiveShadow = true;
            android.scale.set(25, 25, 25);
            android.position.set(abspos.x, abspos.y - 5, abspos.z);
           
            var handleCollision2 = function(collided_with, linearVelocity, angularVelocity) {
            collided_with.setLinearVelocity(collided_with.getLinearVelocity().multiplyScalar(-1));
            };
            android.addEventListener('collision', handleCollision2);
            SCENE.add(android);

        }
    }
}



function buildAxes() {
    var axes = new THREE.Object3D();

    axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(100, 0, 0), 0xFF0000, false)); // +X
    axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(-100, 0, 0), 0x800000, true)); // -X
    axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 100, 0), 0x00FF00, false)); // +Y
    axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, -100, 0), 0x008000, true)); // -Y
    axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 100), 0x0000FF, false)); // +Z
    axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -100), 0x000080, true)); // -Z

    return axes;

}

function buildAxis(src, dst, colorHex, dashed) {
    var geom = new THREE.Geometry(),
        mat;

    if (dashed) {
        mat = new THREE.LineDashedMaterial({
            linewidth: 1,
            color: colorHex,
            dashSize: 5,
            gapSize: 5
        });
    } else {
        mat = new THREE.LineBasicMaterial({
            linewidth: 1,
            color: colorHex
        });
    }

    geom.vertices.push(src.clone());
    geom.vertices.push(dst.clone());

    var axis = new THREE.Line(geom, mat);

    return axis;

}
