const constraints = { "video": { width: { exact: 320 } } };
var videoTag = document.getElementById('video-tag');
var imageTag = document.getElementById('image-tag');
var imageCapturer;

function start() {
  navigator.mediaDevices.getUserMedia(constraints)
    .then(gotMedia)
    .catch(e => { console.error('getUserMedia() failed: ', e); });
}

function gotMedia(mediastream) {
  videoTag.src = URL.createObjectURL(mediastream);

  var videoTrack = mediastream.getVideoTracks()[0];
  imageCapturer = new ImageCapture(videoTrack);

  setTimeout(() => {
    const capabilities = videoTrack.getCapabilities()
    if (!capabilities.zoom) {
      return;
    }
  }, 500);

}

function takePhoto() {
  imageCapturer.takePhoto()
    .then((blob) => {
      console.log("Photo taken: " + blob.type + ", " + blob.size + "B")
      imageTag.src = URL.createObjectURL(blob);
    })
    .catch((err) => {
      console.error("takePhoto() failed: ", e);
    });
}
start()

$(document).ready(function () {
  var sadHead = $("#photo .container-fluid .row .col-md-12 .photo .topPart .header .col-md-6 .leftPart ul li:first-child");
  var before = $("#photo .container-fluid .row .col-md-12 .photo .topPart .header .col-md-6 .leftPart ul li:first-child .upper");
  var after = $("#photo .container-fluid .row .col-md-12 .photo .topPart .header .col-md-6 .leftPart ul li:first-child .down");
  var light = $("#photo .container-fluid .row .col-md-12 .photo .topPart ul.mainFace li:last-child .light")
  var imgTag = $(".imgTag")

  function play() {
    var audio = document.getElementById("audio");
    audio.play();
  }
  sadHead.click(function () {
    before.addClass("beforeClick");
    after.addClass("afterClick");
    light.addClass("photoLight");
    imgTag.addClass("imgtagAfter")
    takePhoto();
    play()
    setTimeout(function () {
      before.removeClass("beforeClick");
      after.removeClass("afterClick");
      light.removeClass("photoLight");
    }, 500);
  })
});