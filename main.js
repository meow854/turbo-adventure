video= "";
status= "";
objects= [];


function preload() {
    video= createVideo("video.mp4");
    video.hide();
}

function setup() {
    canvas= createCanvas(480, 380);
    canvas.center();
}

function start() {
    objectdetector= ml5.objectDetector("cocossd", modlod);
    document.getElementById("stat").innerHTML= "Status: Detecting Objects";
}

function modlod() {
    console.log("model loaded :)");
    status= true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotresults(error, results) {
    if(error) {
        console.log(error);
    }
    console.log(results);
    objects= results;
}

function draw() {
    image(video, 0, 0, 480, 380);
    if(status != ""){
        objectdetector.detect(video, gotresults);
        for(i = 0; i < objects.length; i++) {
            document.getElementById("stat").innerHTML= "Status: Objects Detected";
            document.getElementById("numofobj").innerHTML= "Number Of Objects Detected: " + objects.length;
            percent= floor(objects[i].confidence * 100);
            fill("pink");
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("pink");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}