function onWindowResize(event) {
    containerWidth = CONTAINER.clientWidth;
    containerHeight = CONTAINER.clientHeight;
    RENDERER.setSize(containerWidth, containerHeight);
    CAMERA.aspect = containerWidth / containerHeight;
    CAMERA.updateProjectionMatrix();
}


function onDocumentMouseMove(event) {
    event.preventDefault();
    MOUSE.x = ((event.clientX - LEFTSIDEBAR.clientWidth) / window.innerWidth) * 2 - 1;
    MOUSE.y = -(event.clientY / window.innerHeight) * 2 + 1;


    raycaster.setFromCamera(MOUSE, CAMERA);
    var intersects = raycaster.intersectObjects(grids.children);
    if (intersects.length > 0) {

        var intersect = intersects[0];

        placeholder.position.copy(intersect.point).add(intersect.face.normal);
        placeholder.position.divideScalar(UNIT_STEP).floor().multiplyScalar(UNIT_STEP).addScalar(UNIT_STEP / 2);

    }

}


function onDocumentMouseClick(event) {
    event.preventDefault();
    MOUSE.x = ((event.clientX - LEFTSIDEBAR.clientWidth) / window.innerWidth) * 2 - 1;
    MOUSE.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(MOUSE, CAMERA);
    var intersections = raycaster.intersectObjects(grids.children);
    var intersection = (intersections.length) > 0 ? intersections[0].point : null;


    if (intersection) {
        intersections[0].object.material.color.set(0xff0000);
        var ingamepos = new inGameCoordinate(0, 0, 0);

        ingamepos.setbyAbs(intersection.x, intersection.y, intersection.z);
        // var box = new gameElement(ingamepos, "box", blockType);

        // box.castShadow = true;

        // OBJECTS.add(box);
        // SCENE.add(box);

        addJson(ingamepos, 1);
    }
}


function onKeyDown(key) {
    rotSpeed = 0.05;

    var x = CAMERA.position.x,
        y = CAMERA.position.y,
        z = CAMERA.position.z;

    if (key == "left") {
        CAMERA.position.x = x * Math.cos(rotSpeed) + z * Math.sin(rotSpeed);
        CAMERA.position.z = z * Math.cos(rotSpeed) - x * Math.sin(rotSpeed);
        CAMERA.lookAt(CAMERA_FOCUS);
    }
    if (key == "right") {
        CAMERA.position.x = x * Math.cos(rotSpeed) - z * Math.sin(rotSpeed);
        CAMERA.position.z = z * Math.cos(rotSpeed) + x * Math.sin(rotSpeed);
        CAMERA.lookAt(CAMERA_FOCUS);
    }

    if (key == "9") {
        //CAMERA.position.x = x * 0.9;
        CAMERA.position.set(x * 0.9, y * 0.9, z * 0.9);
        CAMERA.lookAt(CAMERA_FOCUS);
    }

    if (key == "0") {
        CAMERA.position.set(x * 1.1, y * 1.1, z * 1.1);
        CAMERA.lookAt(CAMERA_FOCUS);
    }
    if (key == "up") {
        CAMERA.position.set(x, y + 10, z);
        CAMERA.lookAt(CAMERA_FOCUS);
    }
    if (key == "down") {
        CAMERA.position.set(x, y - 10, z);
        CAMERA.lookAt(CAMERA_FOCUS);
    }


    if (key == "r") {

        // stop simulation
        if (onSimulation) {
            onSimulation = false;
            SCENE.add(placeholder);
            // gameball.setLinearVelocity(new THREE.Vector3(0, 0, 0));
            // gameball.setAngularVelocity(new THREE.Vector3(0, 0, 0));

            // gameball.freeze();
            // gameball.position.set(START.x, START.y, START.z);

            SCENE.remove(gameball);
            delete gameball;
            gameball = new gameElement(START, "gameBall");
            SCENE.add(gameball);
            gameball.freeze();
            CAMERA.position.set(camPosition_prev.x, camPosition_prev.y, camPosition_prev.z);

        } else { // start simulation
            // SCENE.remove(lines);
            onSimulation = true;
            SCENE.remove(placeholder);

            gameball.activate();
            gameball.setLinearVelocity(new THREE.Vector3(0, 0, -10));

            camPosition_prev.x = CAMERA.position.x;
            camPosition_prev.y = CAMERA.position.y;
            camPosition_prev.z = CAMERA.position.z;
        }


    }


}
