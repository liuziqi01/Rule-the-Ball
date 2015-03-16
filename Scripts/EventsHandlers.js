function onKeyDown() {
        if(keyboardState == true){

                switch ( event.keyCode ) {

                        case 38: // up
                        case 87: // w
                                moveForward = true;
                                break;

                        case 37: // left
                        case 65: // a
                                moveLeft = true; 
                                break;

                        case 40: // down
                        case 83: // s
                                moveBackward = true;
                                break;

                        case 39: // right
                        case 68: // d
                                moveRight = true;
                                break;
                    
                        case 32: // space
                                if ( canJump == true ) 
                                        {sphere.position.z += 20;}
                                canJump = false;
                                break;	
                }
        }
        else{
                switch ( event.keyCode ) {

                        case 38: // up
                            camera.position.z += 20;
                            break;
                        case 188: // ,
                                moveForward = true;
                                break;

                        case 37: // left
                            camera.position.x -= 20;
                            camera.position.y += 10;
                            break;
                        case 65: // a
                                moveLeft = true; 
                                break;

                        case 40: // down
                            camera.position.z -= 20;
                            break;
                        case 79: // o
                                moveBackward = true;
                                break;

                        case 39: // right
                            camera.position.x += 20;
                            camera.position.y -= 10;
                            break;
                        case 69: // e
                                moveRight = true;
                                break;
                    
                        case 32: // space
                                if ( canJump == true ) 
                                        {sphere.position.z += 20;}
                                canJump = false;
                                break;	
                }

        }

}

function onKeyUp () {
        // us
        if (keyboardState == true){

                switch( event.keyCode ) {

                        case 38: // up
                        case 87: // w
                                moveForward = false;
                                break;

                        case 37: // left
                        case 65: // a
                                moveLeft = false;
                                break;

                        case 40: // down
                        case 83: // s
                                moveBackward = false;
                                break;

                        case 39: // right
                        case 68: // d
                                moveRight = false;
                                break;

                                case 32: // space
                        
                        sphere.position.z -= 19;
                        canJump = true;
                                break;
                       
                }
        }
        //dvorak
        else{
                switch( event.keyCode ) {

                        case 38: // up
                            break;
                        case 188: // ,
                                moveForward = false;
                                break;

                        case 37: // left
                            break;
                        case 65: // a
                                moveLeft = false;
                                break;

                        case 40: // down
                            break;
                        case 79: // o
                                moveBackward = false;
                                break;

                        case 39: // right
                            break;
                        case 69: // e
                                moveRight = false;
                                break;

                case 32: // space
                        
                    sphere.position.z -= 19;
                        canJump = true;
                                break;
                       
                }

        }

}


function keyboard_selection(){
        keyboardLayout = document.getElementById("keyboard_layout_us");
        if (keyboardLayout.checked != keyboardState) {
            keyboardState = keyboardLayout.checked;
        }

}