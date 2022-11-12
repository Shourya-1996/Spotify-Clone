console.log("welcome to Spotify");
let audioElement = new Audio('songs/perfect.mp3');
let songIndex = 0;
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let songItems = Array.from(document.getElementsByClassName('songItem'));
//Intialize the variables
let songs = [
    { songName: "Perfect - Ed Sheeran", filePath: "songs/perfect.mp3", coverPath: "covers/perfect.jpg" },
    { songName: "Yellow - Coldplay", filePath: "songs/Yellow.mp3", coverPath: "covers/Yellow.jpg" },
    { songName: "Let Her Go - Passenger", filePath: "songs/Let Her Go.mp3", coverPath: "covers/Let Her Go.jpg" },
    { songName: "The Scientist - Coldplay", filePath: "songs/The Scientist.mp3", coverPath: "covers/The Scientist.jpg" },
    { songName: "Viva La Vida - Coldplay", filePath: "songs/Viva La Vida.mp3", coverPath: "covers/Viva La Vida.jpg" }
]

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerHTML = songs[i].songName;
})
// audioElement.play();

//Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play')
        masterPlay.classList.add('fa-pause')
    }
    else {
        audioElement.pause();
        // console.log(audioElement.src);
        masterPlay.classList.remove('fa-pause')
        masterPlay.classList.add('fa-play')
    }
})

// Listen to Events
audioElement.addEventListener('timeupdate', () => {
    //update seek bar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100)
    console.log(progress)
    myProgressBar.value = progress
    if (progress == 100) {
        nextSong();
    }
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        console.log(e.target);
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-pause');
        audioElement.src = songs[songIndex].filePath;
        document.getElementById('currentSongPlaying').innerHTML = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
    })
})

document.getElementById('previous').addEventListener('click', previousSong)
document.getElementById('next').addEventListener('click', nextSong);

function nextSong() {
    if (songIndex > 3) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = songs[songIndex].filePath;
    document.getElementById('currentSongPlaying').innerHTML = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
}
function previousSong() {

    if (songIndex < 1) {
        songIndex = 4;
    } else {
        songIndex -= 1;
    }
    audioElement.src = songs[songIndex].filePath;
    document.getElementById('currentSongPlaying').innerHTML = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
}