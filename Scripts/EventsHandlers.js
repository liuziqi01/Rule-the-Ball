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
                        case 188: // ,
                                moveForward = true;
                                break;

                        case 37: // left
                        case 65: // a
                                moveLeft = true; 
                                break;

                        case 40: // down
                        case 79: // o
                                moveBackward = true;
                                break;

                        case 39: // right
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
                        case 188: // ,
                                moveForward = false;
                                break;

                        case 37: // left
                        case 65: // a
                                moveLeft = false;
                                break;

                        case 40: // down
                        case 79: // o
                                moveBackward = false;
                                break;

                        case 39: // right
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