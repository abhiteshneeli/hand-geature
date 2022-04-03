var prediction_1='';
var prediction_2='';
 Webcam.set({
     width:350,
     height:300,
     img_fromat:'png',
     png_quality:90
 });

 camera=document.getElementById("camera");

 Webcam.attach("#camera");

 function take_snapshot(){
     Webcam.snap(function (data_uri){
         document.getElementById("result").innerHTML='<img id="captured_img" src="'+data_uri+'"/>';
     });
 }

 console.log("ml5 version :",ml5.version);

 classifier=
 ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/r_K2WlJiB/model.json',model_loaded);

 function model_loaded(){
     console.log("model_loaded");
 }

 function speak(){
    var synth =window.speechSynthesis;
    speak_data_1="The first predition is "+prediction_1;
    speak_data_2="The second predition is "+prediction_2;
    var utterThis=new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
    synth.speak(utterThis);
}

function check(){
    img=document.getElementById('captured_img');
    classifier.classify(img,gotresult);
}

function gotresult(error,results){
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        document.getElementById("result_emotion_name2").innerHTML=results[1].label;
        prediction_1=results[0].label;
        prediction_2=results[1].label;
        speak();
         if(results[0].label == "peace sign"){
            document.getElementById("update_emoji").innerHTML ="&#9996;";
        }
        if(results[0].label == "Thumbs Up"){
            document.getElementById("update_emoji").innerHTML ="&#128077;";
        }

        if(results[0].label == "super"){
            document.getElementById("update_emoji").innerHTML ="&#128076;";
        }



        if(results[1].label == "peace sign"){
            document.getElementById("update_emoji2").innerHTML ="&#9996;";
        }
        if(results[1].label == "Thumbs Up"){
            document.getElementById("update_emoji2").innerHTML ="&#128077;";
        }

        if(results[1].label == "super"){
            document.getElementById("update_emoji2").innerHTML ="&#128076;";
        }
    }
}