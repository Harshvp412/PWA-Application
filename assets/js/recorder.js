let constraintObj = { 
    audio: true, 
}; 
// width: 1280, height: 720  -- preference only
// facingMode: {exact: "user"}
// facingMode: "environment"

//handle older browsers that might implement getUserMedia in some way
if (navigator.mediaDevices === undefined) {
    navigator.mediaDevices = {};
    navigator.mediaDevices.getUserMedia = function(constraintObj) {
        let getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        if (!getUserMedia) {
            return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
        }
        return new Promise(function(resolve, reject) {
            getUserMedia.call(navigator, constraintObj, resolve, reject);
        });
    }
}else{
    navigator.mediaDevices.enumerateDevices()
    .then(devices => {
        devices.forEach(device=>{
            console.log(device.kind.toUpperCase(), device.label);
            //, device.deviceId
        })
    })
    .catch(err=>{
        console.log(err.name, err.message);
    })
}

navigator.mediaDevices.getUserMedia(constraintObj)
.then(function(mediaStreamObj) {
   
    //add listeners for saving video/audio

    let vidSave = document.getElementById('vid2');
    let mediaRecorder = new MediaRecorder(mediaStreamObj);
    let chunks = [];

    $(document).ready(function() {
    
        $("#audio_setting3").change(function() {
          if (this.checked ) {
            $("#icon_on").css({
              opacity: 1,
              left: "198px"
            });
            $("#icon_off").css({
              opacity: 0,
              left: "198px"
            });
            $("#result3").html("ON");

            mediaRecorder.start();
            console.log(mediaRecorder.state);
                
          } else {
            $("#icon_on").css({
              opacity: 0,
              left: "158px"
            });
            $("#icon_off").css({
              opacity: 1,
              left: "158px"
            });
            $("#result3").html("OFF");
            mediaRecorder.stop();
            console.log(mediaRecorder.state);
        
          }
        });
        
        
      });


    mediaRecorder.ondataavailable = function(ev) {
        chunks.push(ev.data);
    }
    mediaRecorder.onstop = (ev)=>{
        let blob = new Blob(chunks, { 'type' : 'video/mp4;' });
        chunks = [];
        let videoURL = window.URL.createObjectURL(blob);
        vidSave.src = videoURL;
    }
})
.catch(function(err) { 
    console.log(err.name, err.message); 
});

