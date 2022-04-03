/*!
* Start Bootstrap - Grayscale v7.0.5 (https://startbootstrap.com/theme/grayscale)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-grayscale/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });
});


let map;
var markers = [];
let marker;

let lang = "es";
let descripionHTML;


var videoElement = document.querySelector("video");
var textTracks = videoElement.textTracks;
videoElement.addTextTrack("metadata","User", "es");
var textTrack = textTracks[0];

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 25.195336496218886, lng: -4.039732206325712},
        zoom: 2,
    });  
}


textTrack.oncuechange = function () {
    var cue = this.activeCues[0];
    var obj = JSON.parse(cue.text);
    console.log(obj)
    console.log(obj.descripcion[lang])
    descripionHTML += '<h2 class="text-white mb-4">' + obj.titulo +'</h2> <p class="text-white-50" >'+  obj.descripcion[lang] +'</p>';

    ('#description').append(descripionHTML)
    marker = new google.maps.Marker({
        position: {lat: parseInt(obj.lat), lng: parseInt(obj.lng)},
        map,
        title: obj.titulo,
        
        
    });
}


// marker.addListener("click", function() {
//     var title = marker.getTitle();
//     console.log(title)
//     if( title == "Lima - Peru"){
//         videoElement.currentTime = textTrack.cues[0].startTime;
//     }
//     if(title == "Roatán - Honduras"){
//         videoElement.currentTime = textTrack.cues[1].startTime;
//     }
//     if(title == "Viña del mar - Chile"){
//         videoElement.currentTime = textTrack.cues[2].startTime;
//     }
//     if(title == "Tegucigalpa - Honduras"){
//         videoElement.currentTime = textTrack.cues[3].startTime;
//     }
//     if(title == "Roatán - Honduras (2)"){
//         videoElement.currentTime = textTrack.cues[4].startTime;
//     }
//     if(title == "Casablanca  - Chile"){
//         videoElement.currentTime = textTrack.cues[5].startTime;
//     }
//     if(title == "Ica  - Peru"){
//         videoElement.currentTime = textTrack.cues[6].startTime;
//     }
//     if(title == "Santa Ana  - Honduras"){
//         videoElement.currentTime = textTrack.cues[7].startTime;
//     }
//     if(title == "Sorrento - Italia"){
//         videoElement.currentTime = textTrack.cues[8].startTime;
//     }
    
// }); 


//--- Funciones control video ---
const videoPlayer = document.querySelector('.video-player')
const video = videoPlayer.querySelector('.video')
const playButton = videoPlayer.querySelector('.play-button')
const addTimeButton = videoPlayer.querySelector('.add-time-button')
const restTimeButton = videoPlayer.querySelector('.rest-time-button')
const changeVelocity = videoPlayer.querySelector('.change-velocity')
const volume = videoPlayer.querySelector('.volume')
const currentTimeElement = videoPlayer.querySelector('.current')
const durationTimeElement = videoPlayer.querySelector('.duration')
const progress = videoPlayer.querySelector('.video-progress')
const progressBar = videoPlayer.querySelector('.video-progress-filled')

//Change Velocity
changeVelocity.addEventListener('click', (e)=>{
    if(changeVelocity.textContent == 'x2'){
        changeVelocity.textContent = 'x1'
        video.playbackRate = 2.0
    }else{
        changeVelocity.textContent = 'x2'
        video.playbackRate = 1.0
    }
})
//Add 5 seconds
addTimeButton.addEventListener('click', (e) =>{
    video.currentTime =video.currentTime + 5;
})

//Rest 5 seconds
restTimeButton.addEventListener('click', (e) =>{
    video.currentTime = video.currentTime - 5
})
//Play and Pause button
playButton.addEventListener('click', (e) => {
  if(video.paused){
    video.play()
    e.target.textContent = '❚ ❚'
  } else {
    video.pause()
    e.target.textContent = '►'
  }
})

//volume
volume.addEventListener('mousemove', (e)=> {
  video.volume = e.target.value
})

//current time and duration
const currentTime = () => {
  let currentMinutes = Math.floor(video.currentTime / 60)
  let currentSeconds = Math.floor(video.currentTime - currentMinutes * 60)
  let durationMinutes = Math.floor(video.duration / 60)
  let durationSeconds = Math.floor(video.duration - durationMinutes * 60)

  currentTimeElement.innerHTML = `${currentMinutes}:${currentSeconds < 10 ? '0'+currentSeconds : currentSeconds}`
  durationTimeElement.innerHTML = `${durationMinutes}:${durationSeconds}`
}

video.addEventListener('timeupdate', currentTime)


//Progress bar
video.addEventListener('timeupdate', () =>{
  const percentage = (video.currentTime / video.duration) * 100
  progressBar.style.width = `${percentage}%`
})

//change progress bar on click
progress.addEventListener('click', (e) =>{
  const progressTime = (e.offsetX / progress.offsetWidth) * video.duration
  video.currentTime = progressTime
})


  
