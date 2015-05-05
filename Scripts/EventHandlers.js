function onWindowResize(event) {
    containerWidth = CONTAINER.clientWidth;
    containerHeight = CONTAINER.clientHeight;
    RENDERER.setSize(containerWidth, containerHeight);
    CAMERA.aspect = containerWidth / containerHeight;
    CAMERA.updateProjectionMatrix();
}


function onDocumentMouseMove(event) {
    event.preventDefault();
    MOUSE.x = 2 * (event.clientX / CONTAINER.clientWidth) - 1;
    MOUSE.y = 1 - 2 * (event.clientY / CONTAINER.clientHeight);
    console.log("moving");

    raycaster.setFromCamera(MOUSE, CAMERA);
    var projector = new THREE.Raycaster();

    projector.setFromCamera(MOUSE, CAMERA),
        intersects = projector.intersectObjects(OBJECTS.children);

    OBJECTS.children.forEach(function(cube) {
        cube.material.color.setRGB(cube.grayness, cube.grayness, cube.grayness);
    });


    for (var i = 0; i < intersects.length; i++) {
        var intersection = intersects[i],
            obj = intersection.object;

        obj.material.color.setRGB(1.0 - i / intersects.length, 0, 0);
    }
}


function onDocumentMouseClick(event) {
    event.preventDefault();
    MOUSE.x = ((event.clientX-LEFTSIDEBAR.clientWidth) / window.innerWidth ) * 2 - 1 ;
    MOUSE.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    mouse_click = true;
    // console.log("MOUSE.x : " + MOUSE.x + "; MOUSE.y : " + MOUSE.y + "; window inner " + window.innerWidth + " ; clientWidth : " + CONTAINER.clientWidth);

    raycaster.setFromCamera(MOUSE, CAMERA);
    var intersections = raycaster.intersectObjects(grids.children);
    var intersection = (intersections.length) > 0 ? intersections[0].point : null;


    if (intersection) {
        intersections[0].object.material.color.set(0xff0000);
        var ingamepos = new inGameCoordinate(0,0,0);

        ingamepos.setbyAbs(intersection.x, intersection.y, intersection.z);
        console.log("intersection.x : " + intersection.x + "; ingamepos.x : " + ingamepos.x);
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

        simulation = true;
        ole_camera = CAMERA.position;
        var temp = sphere.position;
        console.log(temp);
        SCENE.remove(sphere);

        sphere_simulation = new Physijs.SphereMesh(
            new THREE.SphereGeometry(13, 100, 100),
            new THREE.MeshLambertMaterial({
                map: THREE.ImageUtils.loadTexture('Images/basketball.jpg')
            }),
            10 // mass
        );

        sphere_simulation.position.set(sphere.position.x, sphere.position.y + 5, sphere.position.z);
        SCENE.add(sphere_simulation);
        CAMERA.position.set(sphere_simulation.position.x - 50, sphere_simulation.position.y + 50, sphere_simulation.position.z);

        CAMERA.lookAt(sphere_simulation.position);
        sphere_simulation.setLinearVelocity(new THREE.Vector3(10, 0, 0));
        //SCENE.simulate();

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


}
