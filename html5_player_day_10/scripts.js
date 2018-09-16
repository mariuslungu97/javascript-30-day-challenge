/* Get our elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');

const progress = player.querySelector('.progress');
const progressFilled = player.querySelector('.progress__filled');

const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullButton = player.querySelector('.full');
/* Build our functions */

function togglePlay() {
    if(video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

function skip() {
    const skipTag = this.dataset.skip;
    const skipValue = parseFloat(skipTag);

    if(video.currentTime + skipValue > video.duration || video.currentTime + skipValue < 0) return;
    else video.currentTime += skipValue;
}

function updateToggleButton() {
    const icon = this.paused ? '►' : '▋▋';
    toggle.textContent = icon;
}

function updateRange() {
    video[this.name] = this.value;
}

function handleProgress() {
    const percentage = (video.currentTime / video.duration) * 100;
    progressFilled.style['flex-basis'] = `${percentage}%`;
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

function goFull() {
    console.log('it fires');
    if(video.requestFullscreen) video.requestFullscreen();
    else if(video.webkitRequestFullScreen){
		video.webkitRequestFullScreen();
	} else if(vid.mozRequestFullScreen){
		video.mozRequestFullScreen();
	}
    
}

/* Hook up our event listeners */
video.addEventListener('click',togglePlay);
video.addEventListener('play',updateToggleButton);
video.addEventListener('pause',updateToggleButton);
video.addEventListener('timeupdate',handleProgress);
toggle.addEventListener('click',togglePlay);
skipButtons.forEach(btn => btn.addEventListener('click',skip));
ranges.forEach(range => range.addEventListener('click',updateRange));

let mouseDown = false;
progress.addEventListener('click',scrub);
progress.addEventListener('mousedown',() => mouseDown = true);
progress.addEventListener('mousedown',() => mouseDown = false);
progress.addEventListener('mousemove',(e) => mouseDown && scrub(e));
fullButton.addEventListener('click',goFull);