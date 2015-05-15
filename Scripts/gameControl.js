//makeSplash(1);
var makeSplash = function(stage_num) {
    console.log("Making a new");
    var splash = document.createElement("IMG");
    splash.id = "splash";
    splash.setAttribute("style", "position:fixed");
    if (stage_num == 0) {
        splash.src = "Images/start.jpg";
    }
    if (stage_num == 1) {
        splash.src = "Images/stage2.jpg";
    }
    if (stage_num == 3) {
        splash.src = "Images/stage3.jpg";
    }
        if (stage_num == 4) {
        splash.src = "Images/stage4.png";
    }
        if (stage_num == 5) {
        splash.src = "Images/stage5.png";
    }
    //currentSpalsh.setAttribute("position","fixed");
    //splash.appendChild(t);
    splash.addEventListener("click", function(event) {
        var currentStage = new Stage();
        // currentStage.init(3);
        currentStage.init(stage_num);
    }, false);
    delete currentStage;
    document.body.appendChild(splash)

}
