//Get the elements:

const player = document.querySelector('.player');
const video = player.querySelector('.viewer'); 
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled')
const toggleP = player.querySelector('.toggle'); //ok
const ranges = player.querySelectorAll('.player__slider');//ok
const skipBtns = player.querySelectorAll('[data-skip]'); //ok


//functions

// Function toggles between play and pause
function togglePlay() {
    if(video.paused){
        video.play();
    }else {
        video.pause(); 
    }
}

function switchIcon() {
if (video.paused){
    toggleP.innerHTML = "►";
} else {
    toggleP.innerHTML = "▌▌";   
}
}

function skip() {
video.currentTime += parseFloat(this.dataset.skip)
}

function volumeControl() {
    video[this.name]=this.value;
}


function videoProgress() {
    const prog = (video.currentTime / video.duration)*100;
    progressBar.style.flexBasis = `${prog}%`;
}
// 

function scrub(e) {
    const scrubTo= (e.offsetX/progress.offsetWidth)*video.duration;
    video.currentTime = scrubTo;

}



video.addEventListener('click', togglePlay);
toggleP.addEventListener('click', togglePlay);
video.addEventListener('play', switchIcon);
video.addEventListener('pause', switchIcon);
skipBtns.forEach(btn=>btn.addEventListener('click',skip)); // Her har vi brugt forEach fordi der er mere end 1 div med skipBtn class.
ranges.forEach(range => range.addEventListener('change', volumeControl));
video.addEventListener('timeupdate', videoProgress); //hvorfor video og ikke progressbar?

let mouseDown = false;

progress.addEventListener('click', scrub);

progress.addEventListener('mousemove', (e) => {

    if(mouseDown){
        scrub(e);
    }
});
progress.addEventListener('mousedown', ()=> mouseDown = true);
progress.addEventListener('mouseup', () => mouseDown = false);


