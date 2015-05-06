//makeSplash(1);
function makeSplash(stage_num)
{
var splash = document.createElement("IMG");
splash.id = "splash";
    if(stage_num ==0){
splash.src = "Images/start.jpg";
    }
    if(stage_num == 1)
    {
        splash.src = "Images/stage2.jpg";
    }
    if(stage_num == 2)
    {
        splash.src = "Images/stage3.jpg";
    }
//currentSpalsh.setAttribute("position","fixed");
//splash.appendChild(t);
document.body.appendChild(splash);
var currentStage = new Stage()

document.getElementById("splash").addEventListener("click",currentStage.init, false);

}
