var endingPo=[0,0,0];
function buildMaps(mapIdx) {
    var mapTemp = new THREE.Object3D();
    // var mapTemp = [];
    /***** 0 ******/
    if (mapIdx === 0) {
        var box = new gameElement(new inGameCoordinate(6, 6, 1), "startingPoint");
        endingPo = [6,5,1];
        mapTemp.add(box);
        console.log("building map");

        box = new gameElement(new inGameCoordinate(6, 5, 1), "endingPoint");
        mapTemp.add(box);
    }
    /***** 1 ******/
    else if (mapIdx === 1) {

        for (var iX = 0; iX < UNIT_STEP; ++iX) {
            if (iX != 8) {
                for (var iY = 0; iY < UNIT_STEP; ++iY) {
                    box = new gameElement(new inGameCoordinate(iX, iY, 6), "box", 0);
                    mapTemp.add(box);
                    mapTemp.add(box);
                }
            }
        }

        box = new gameElement(new inGameCoordinate(6, 6, 1), "startingPoint");
        mapTemp.add(box);

        box = new gameElement(new inGameCoordinate(6, 6, 10), "endingPoint");
        endingPo = [6,6,10];
        mapTemp.add(box);

    }

    /***** 2 ******/
    else if (mapIdx === 2) {
        for (var iX = 0; iX < UNIT_STEP; ++iX) {
            if (iX != 8) {
                for (var iY = 0; iY < UNIT_STEP; ++iY) {
                    box = new gameElement(new inGameCoordinate(iX, iY, 6), "box", 0);
                    mapTemp.add(box);
                }
            }
        }

        for (var iX = 0; iX < UNIT_STEP; ++iX) {
            if (iX != 4) {
                for (var iY = 0; iY < UNIT_STEP; ++iY) {
                    box = new gameElement(new inGameCoordinate(iX, iY, 9), "box", 0);
                    mapTemp.add(box);
                }
            }
        }

        box = new gameElement(new inGameCoordinate(6, 6, 1), "startingPoint");
        mapTemp.add(box);

        box = new gameElement(new inGameCoordinate(6, 6, 11), "endingPoint");
        mapTemp.add(box);
       endingPo = [6,6,10];

    }



    /***** 3 ******/
    else if (mapIdx === 3) {
        var abspos = new absCoordinate();
        abspos.setbyInGame(0, 0, 3);
        box = new Physijs.BoxMesh(
            new THREE.BoxGeometry(UNIT_STEP * 3, UNIT_STEP * 12, UNIT_STEP),
            new THREE.MeshLambertMaterial({
                map: THREE.ImageUtils.loadTexture('Images/RocksArid.jpg')
            }));
        box.position.set(abspos.x + UNIT_STEP, abspos.y + UNIT_STEP * 11 / 2, abspos.z);

        mapTemp.add(box);

        abspos.setbyInGame(4, 0, 3);
        box = new Physijs.BoxMesh(
            new THREE.BoxGeometry(UNIT_STEP * 8, UNIT_STEP * 12, UNIT_STEP),
            new THREE.MeshLambertMaterial({
                map: THREE.ImageUtils.loadTexture('Images/RocksArid.jpg')
            }));
        box.position.set(abspos.x + UNIT_STEP * 7 / 2, abspos.y + UNIT_STEP * 11 / 2, abspos.z);

        mapTemp.add(box);


        abspos.setbyInGame(0, 0, 7);
        box = new Physijs.BoxMesh(
            new THREE.BoxGeometry(UNIT_STEP * 7, UNIT_STEP * 12, UNIT_STEP),
            new THREE.MeshLambertMaterial({
                map: THREE.ImageUtils.loadTexture('Images/RocksArid.jpg')
            }));
        box.position.set(abspos.x + UNIT_STEP * 3, abspos.y + UNIT_STEP * 11 / 2, abspos.z);

        mapTemp.add(box);

        abspos.setbyInGame(8, 0, 7);
        box = new Physijs.BoxMesh(
            new THREE.BoxGeometry(UNIT_STEP * 4, UNIT_STEP * 12, UNIT_STEP),
            new THREE.MeshLambertMaterial({
                map: THREE.ImageUtils.loadTexture('Images/RocksArid.jpg')
            }));
        box.position.set(abspos.x + UNIT_STEP * 3 / 2, abspos.y + UNIT_STEP * 11 / 2, abspos.z);

        mapTemp.add(box);

        box = new gameElement(new inGameCoordinate(6, 6, 0), "startingPoint");

        mapTemp.add(box);

        box = new gameElement(new inGameCoordinate(6, 6, 11), "endingPoint");

       endingPo = [6,6,10];

        mapTemp.add(box);

    }

    /***** 4 ******/

    return mapTemp;
}
