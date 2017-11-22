import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      seekerValue : 0,
      volumeValue : 1
    }
    this.playPause = this.playPause.bind(this);
    this.mute = this.mute.bind(this);
    this.toggleFullScreen=this.toggleFullScreen.bind(this);
    this.seekBarChange = this.seekBarChange.bind(this);
    this.adjustVolume = this.adjustVolume.bind(this);
  }

  componentDidMount(){
    var video = document.getElementById("video");
    // Sliders
    var seekBar = document.getElementById("seek-bar");
    var volumeBar = document.getElementById("volume-bar");
    video.addEventListener("timeupdate", function() {
      // Calculate the slider value
      var value = (100 / video.duration) * video.currentTime;
    
      // Update the slider value
      seekBar.value = value;
    });
    seekBar.addEventListener("mousedown", function() {
      video.pause();
    });
    
    // Play the video when the slider handle is dropped
    seekBar.addEventListener("mouseup", function() {
      video.play();
    });
  }

  playPause(){
    var video = document.getElementById("video");
    var playButton = document.getElementById("play-pause");
    if (video.paused == true) {
      // Play the video
      video.play();
  
      // Update the button text to 'Pause'
      playButton.innerHTML = "&#9646;&#9646;";
    } else {
      // Pause the video
      video.pause();
  
      // Update the button text to 'Play'
      playButton.innerHTML = "&#9654;";
    }
  }

  mute(){
    var video = document.getElementById("video");
    var muteButton = document.getElementById("mute");
    if (video.muted == false) {
      // Mute the video
      video.muted = true;
  
      // Update the button text
      muteButton.innerHTML = "Unmute";
    } else {
      // Unmute the video
      video.muted = false;
  
      // Update the button text
      muteButton.innerHTML = "Mute";
    }
  }

  toggleFullScreen(){
    var video = document.getElementById("video");
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.mozRequestFullScreen) {
      video.mozRequestFullScreen(); // Firefox
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen(); // Chrome and Safari
    }
  }

  seekBarChange(){
    // Calculate the new time
    var video = document.getElementById("video");
    var seekBar = document.getElementById("seek-bar");
    var time = video.duration * (seekBar.value / 100);
    // Update the video time
    video.currentTime = time;
    this.setState({
      seekerValue : seekBar.value
    })
  }

  adjustVolume(){
    // Update the video volume
    var video = document.getElementById("video");
    var volumeBar = document.getElementById("volume-bar");
    video.volume = volumeBar.value;
    this.setState({volumeValue : volumeBar.value});
  }

  render() {
    return (
      <div id="video-container" className="con">
      <video playsInline id="video" width="640" height="365">
      <source src="https://www.html5rocks.com/en/tutorials/video/basics/devstories.webm" 
      type='video/webm;codecs="vp8, vorbis"' />
        <p>
          Your browser doesn't support HTML5 video.
          <a href="videos/mikethefrog.mp4">Download</a> the video instead.
        </p>
      </video>
      <div id="video-controls">
        <div id="play-pause" onClick={this.playPause}>&#9654;</div>
        <input type="range" id="seek-bar" value={this.state.seekerValue} onChange={this.seekBarChange} />
        <div id="mute" onClick={this.mute}>Mute</div>
        <input type="range" id="volume-bar" min="0" max="1" step="0.1" value={this.state.volumeValue} onChange={this.adjustVolume}/>
        <div id="full-screen" onClick={this.toggleFullScreen}>Full-Screen</div>
        <a href="https://www.html5rocks.com/en/tutorials/video/basics/devstories.webm" download><div>Download</div></a>
      </div>
    </div>
    );
  }
}

export default App;
