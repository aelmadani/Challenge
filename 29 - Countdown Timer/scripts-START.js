let countdown;
const timerDisplay = document.querySelector('.display__time-left'); //html element where timer should be placed
const endTime = document.querySelector('.display__end-time'); //html element where end time should be placed
const buttons = document.querySelectorAll('[data-time]'); // selects ANYTHING that has a data-time attribute


function timer(seconds) {
    
    // clear old timers first
    clearInterval(countdown);
    
    // Time NOW
    const now = Date.now();

    // Time at timer END
    const then = now + seconds*1000;

    displayTimeLeft(seconds); // Dispplays the ime left before countdown
    displayEndTime(then); // Displays time at end of countdown
    
    // Function that runs once every second
    countdown = setInterval( ()=> {
        const secondsLeft = Math.round((then - Date.now())/1000);
        if(secondsLeft <=0 ) {
            clearInterval(countdown);
            return;
        }
        displayTimeLeft(secondsLeft);
    },1000);
}

// function that displays time left in HTML
function displayTimeLeft(seconds) {
    const minutes= Math.floor(seconds / 60);
    let remSeconds = seconds % 60;
    if (remSeconds<10) {
        remSeconds = '0' + remSeconds;
    }
    timerDisplay.textContent = `${minutes}:${remSeconds}`
    console.log(minutes + ':' + remSeconds);
}

// function that displays time at end in HTML
function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    let minutes = end.getMinutes();
    if (minutes<10) {
        minutes = '0' + minutes;
    }
    endTime.textContent= `Be Back At ${hour}:${minutes}`;
}

// The main function that starts the TIMER
function startTimer() {
    // this = this the button clicked
    // dataset = the data attribute selected
    // .time =  because we used data-time
    const seconds = parseInt(this.dataset.time);
    timer(seconds);  
}


buttons.forEach(button => button.addEventListener('click', startTimer));

// Area to type minutes:
// Because the form has a name attribute "name=", then you do not have to select it first.
// You can listen to it directly. Also if it has nested named items:
document.customForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const mins = this.minutes.value;
    timer(mins*60);
    this.reset();
})