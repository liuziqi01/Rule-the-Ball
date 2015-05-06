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
        var box = new gameElement(ingamepos, "box", blockType);

        box.castShadow = true;

        OBJECTS.add(box);
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


    if (key == "r" && !simulation) {
        SCENE.remove(grids);
        SCENE.remove(placeholder);

        gameball.activate();
        gameball.setLinearVelocity(new THREE.Vector3(10, 0, 0));


    }

    if (key == "q" && simulation) {
        simulation = false;
        sphere_simulation.setLinearVelocity(new THREE.Vector3(0, 0, 0));
        SCENE.remove(sphere_simulation);
        SCENE.add(sphere);
        /*
            CAMERA.position.set(ole_camera.posi.x,ole_camera.y,ole_camera.z);
            CAMERA.lookAt(CAMERA_FOCUS);
        */
        CAMERA.position.set(ole_camera.x, ole_camera.y, ole_camera.z);
        CAMERA.lookAt(CAMERA_FOCUS);
    }

    if (key == "h"){
        console.log("h pressed");
        gameball.freeze();
    }
    if (key == "t"){
        console.log("t pressed");
        gameball.activate();
    }


}
