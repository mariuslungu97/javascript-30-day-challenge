let countdown;
let timeLeft = document.querySelector('.display__time-left');
let endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');
function timer(seconds) {

    clearInterval(countdown);
    const now = Date.now();
    const then = now + seconds * 1000;
    displayEndTime(then);

    displaySecondsLeft(seconds);
    
    countdown = setInterval( () => {
        const secondsLeft = Math.round((then -Date.now()) / 1000);

        if(secondsLeft < 0) {
            clearInterval(countdown);
            return;
        }

        displaySecondsLeft(secondsLeft);
    },1000);

    
}
function displaySecondsLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;

    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    timeLeft.textContent = display;

    
}

function displayEndTime(timestamp) {
    const newTime = new Date(timestamp);
    const hours = newTime.getHours();
    const minutes = newTime.getMinutes();

    endTime.textContent = `Be Back At ${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function addTimer() {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

buttons.forEach(button => button.addEventListener('click',addTimer));

document.customForm.addEventListener('submit',function(e) {
    e.preventDefault();
    const minutes = this.minutes.value;
    timer(minutes * 60);
    this.minutes.value = '';
});
