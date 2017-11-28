//get elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

//build functions
function togglePlay(){
    if(video.paused){
        video.play();
    }else{
        video.pause();
    }
}

function updateButton(){
    //paused id a method with video
    const icon = this.paused ? '>' : '||';
    toggle.textContent = icon; 
}

function skip(){
    console.log(this.dataset.skip);
    video.currentTime += parseFloat(this.dataset.skip); 
}

function handleRangeUpadate(){
    video[this.name] = this.value; 
}
//handle moving time around
function handleProgress(){
    const percent = (video.currentTime / video.duration)* 100;
    progressBar.style.flexBasis = `${percent}%`;
}

//scrub video
function scrub(e){
    const scrubTime = (e.offsetX / progress.offsetWidth)* video.duration;
    video.currentTime = scrubTime; 
    console.log(e);
}
//hook up event listeners

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton); 
toggle.addEventListener('click', togglePlay);

//progress bar move
video.addEventListener('timeupdate', handleProgress);
skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpadate));

progress.addEventListener('click' , scrub);

//skipping the video around on clicking the progress bar
let mousedown = false; 
progress.addEventListener('mousemove', (e)=>mousedown && scrub(e));
progress.addEventListener('mousedown' ,() => mounsedown =true);
progress.addEventListener('mouseup' ,() => mounsedown =false);