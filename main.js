img = "";
status = "";
objects = [];
function preload(){
    alert_audio = loadSound('alert.mp3');
}
function setup(){
    canvas= createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    objectDetector = ml5.objectDetector('cocoSSD', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}
function modelLoaded(){
    console.log("CocoSSD Is Initialized");
    status = true;
}
function draw(){
    image(video, 0, 0, 380, 380);
    if (status != ""){
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++){
            if (objects[i].label == "person"){
            alert_audio.stop();
            document.getElementById("status").innerHTML = "Status: Object Detected";
            document.getElementById("status_of_baby").innerHTML = "Baby Detected";
            r = random(255);
            g = random(255);
            b = random(255);
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            textSize(18);
            text("Baby"+" "+ percent + "%", objects[i].x +11, objects[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            }
            else{
                document.getElementById("status_of_baby").innerHTML = "Baby Not Detected";
                alert_audio.play();
            }
            if (objects.length == 0){
                document.getElementById("status_of_baby").innerHTML = "Baby Not Detected";
                alert_audio.play();
            }
        }
    }
}
function gotResult(error, results){
    if (error){
        console.log(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}