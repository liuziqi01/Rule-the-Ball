/* OBJECT Constructors */
// object absolute position
var objAbsPos = {
        createNew: function(x, y, z){
            x = typeof x !== 'undefined' ? x : 0;
            x = typeof x !== 'undefined' ? x : 0;
            x = typeof x !== 'undefined' ? x : 0;
            var posTemp = {};
            posTemp.x = x;
            posTemp.y = y;
            posTemp.z = z;

            return posTemp;
        }
}

var GameBox = {
    createNew: function(initX, initY, initZ, texture){
        texture = typeof texture !== 'undefined' ? texture : BOX_DEFAULT_TEXTURE;
        var box_material = Physijs.createMaterial(
            new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture( texture ) }),
            1, // friction coefficient
            .0 // e
            // note the construction material should be solid and not bounce at all
        );
        var boxtemp = new Physijs.BoxMesh(
            new THREE.BoxGeometry( UNIT_STEP, UNIT_STEP, UNIT_STEP ),
            box_material,
            10 // mass
        );
        boxtemp.position.x = initX ;
        boxtemp.position.y = initY ;
        boxtemp.position.z = initZ ;

        boxtemp.inGamePos = function(x, y, z){
            var absX, absY, absZ;
            if (x < 0) x = 0;
            if (x > SPACE_SIZE - 1) x = SPACE_SIZE - 1;
            if (y < 0) y = 0;
            if (y > SPACE_SIZE - 1) y = SPACE_SIZE - 1;
            if (z < 0) z = 0;
            if (z > SPACE_SIZE - 1) z = SPACE_SIZE - 1;
            boxtemp.position.x = (x - SPACE_SIZE / 2 + 0.5) * UNIT_STEP;
            boxtemp.position.y = (y - SPACE_SIZE / 2 + 0.5) * UNIT_STEP;
            boxtemp.position.z = (z - SPACE_SIZE / 2 + 0.5) * UNIT_STEP;
        }

        return boxtemp;
    }
}


var GameSphere = {
    createNew: function(initX, initY, initZ, texture){
        texture = typeof texture !== 'undefined' ? texture : SPHERE_DEFAULT_TEXTURE;
    var sphere_material = Physijs.createMaterial(
        new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture( texture ) }),
        .4, // low friction
        .3 // high restitution
    );
        var spheretemp = new Physijs.SphereMesh(
            new THREE.SphereGeometry( radius, 100, 100 ),
            sphere_material,
            10 // mass
        );
        spheretemp.position.x = initX ;
        spheretemp.position.y = initY ;
        spheretemp.position.z = initZ ;

        spheretemp.inGamePos = function(x, y, z){
            if (x < 0) x = 0;
            if (x > SPACE_SIZE - 1) x = SPACE_SIZE - 1;
            if (y < 0) y = 0;
            if (y > SPACE_SIZE - 1) y = SPACE_SIZE - 1;
            if (z < 0) z = 0;
            if (z > SPACE_SIZE - 1) z = SPACE_SIZE - 1;
            spheretemp.position.x = (x - SPACE_SIZE / 2 + 0.5) * UNIT_STEP;
            spheretemp.position.y = (y - SPACE_SIZE / 2 + 0.5) * UNIT_STEP;
            spheretemp.position.z = (z - SPACE_SIZE / 2 + 0.5) * UNIT_STEP;
        }

        return spheretemp;
    }
}