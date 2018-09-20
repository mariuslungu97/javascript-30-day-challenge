const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
    navigator.mediaDevices.getUserMedia({video: true, audio: false})
        .then(localMediaStream => {
            console.log(localMediaStream);
            video.src = window.URL.createObjectURL(localMediaStream);
            video.play();
        })
        .catch(err => {
            console.error('Permission Denied',err);
        })
};

function paintToCanvas() {
    const width = video.videoWidth;
    const height = video.videoHeight;

    ctx.width = width;
    ctx.height = height;

    return setInterval(() => {
        ctx.drawImage(video,0,0,width,height);
    },16);
}

function takePhoto() {
    snap.currentTime = 0;
    snap.play();

    //take data
    const data = canvas.toDataURL();
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download','me');
    link.innerHTML = `<img src="${data} />"`;
    strip.insertBefore(link,strip.firstChild);

}

getVideo();

video.addEventListener('canplay',paintToCanvas);
