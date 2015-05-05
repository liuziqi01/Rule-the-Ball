function buildMaps(mapIdx) {
    var mapTemp = new THREE.Object3D();
    /***** 1 ******/
    if (mapIdx === 0) {
        var box = new gameElement(new inGameCoordinate(6, 6, 1), "startingPoint");
        mapTemp.add(box);

        box = new gameElement(new inGameCoordinate(6, 6, 10), "endingPoint");
        mapTemp.add(box);
    }
    /***** 2 ******/
    else if (mapIdx === 1) {

        for (var iX = 0; iX < UNIT_STEP; ++iX) {
            if (iX != 8) {
                for (var iY = 0; iY < UNIT_STEP; ++iY) {
                    box = new gameElement(new inGameCoordinate(iX, iY, 6), "box", 0);
                    mapTemp.add(box);
                }
            }
        }

        box = new gameElement(new inGameCoordinate(6, 6, 1), "startingPoint");
        mapTemp.add(box);

        box = new gameElement(new inGameCoordinate(6, 6, 10), "endingPoint");
        mapTemp.add(box);

    }

    /***** 3 ******/
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

    }



    /***** 4 ******/

    /***** 5 ******/

    return mapTemp;
}
