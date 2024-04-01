flag=""
video=""
objects=[]
function setup() {
    canvas=createCanvas(450,450)
    canvas.center()
}
function preload() {
    video=createVideo("video.mp4")
    video.hide()
    
}
function draw() {
    image(video,0,0,450,450)
    if (flag!="") {
        obj_detector.detect(video,got_result)
        for (let index = 0; index < objects.length; index++) {
            document.getElementById("status").innerHTML="status:objects detected"
            document.getElementById("num_obj").innerHTML="number of objects detected:"+objects.length
            fill("red")
            stroke("red")
            percent=floor(objects[index].confidence*100)
            text(objects[index].label+" "+percent+"%",objects[index].x,objects[index].y)
            noFill()
            rect(objects[index].x,objects[index].y,objects[index].width,objects[index].height)
        }
    }
}
function start() {
    obj_detector=ml5.objectDetector("cocossd",model_loaded)
document.getElementById("status").innerHTML="status: detecting objects"
}
function model_loaded() {
    console.log("model loaded")
    flag=true
    video.loop()
    video.speed(1)
    video.volume(0.5)
}
function got_result(error,results) {
    if (error) {
        console.log(error)
    }
    else{
        console.log(results)
        objects=results
    }
}