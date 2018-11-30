/*
- Make the Play button work
- Make the Pause button work
- Disable the play button if it's playing
- Disable the pause button if it's not playing
- Make the PlayPause button work
- Make the JumpForward button work
- Make the JumpBack button work
- Make the progress bar work
  - change the width of the inner element to the percentage of the played track
  - add a click handler on the progress bar to jump to the clicked spot

Here is the audio API you'll need to use, `audio` is the <audio/> dom nod
instance, you can access it as `this.audio` in `AudioPlayer`

```js
// play/pause
audio.play()
audio.pause()

// change the current time
audio.currentTime = audio.currentTime + 10
audio.currentTime = audio.currentTime - 30

// know the duration
audio.duration

// values to calculate relative mouse click position
// on the progress bar
event.clientX // left position *from window* of mouse click
let rect = node.getBoundingClientRect()
rect.left // left position *of node from window*
rect.width // width of node
```

Other notes about the `<audio/>` tag:

- You can't know the duration until `onLoadedData`
- `onTimeUpdate` is fired when the currentTime changes
- `onEnded` is called when the track plays through to the end and is no
  longer playing

Good luck!
*/

import React from "react";
import podcast from "./lib/podcast.mp4";
import mario from "./lib/mariobros.mp3";
import FaPause from "react-icons/lib/fa/pause";
import FaPlay from "react-icons/lib/fa/play";
import FaRepeat from "react-icons/lib/fa/repeat";
import FaRotateLeft from "react-icons/lib/fa/rotate-left";

const PlayerContext = React.createContext();

class AudioPlayer extends React.Component {
  state = {
    playerReady: false,
    isPlaying: false,
    duration: 0,
    currentTime: 0,
    progress: 0,
    toggleIsPlaying: () => {
      this.toggleIsPlaying();
    },
    jumpForward: () => {
      this.jumpForward();
    },
    jumpBack: () => {
      this.jumpBack();
    },
    onProgressClick: () => this.onProgressClick
  };
  toggleIsPlaying() {
    const nextState = !this.state.isPlaying;
    if (nextState) {
      this.audio.play();
    } else {
      this.audio.pause();
    }
    this.setState({
      isPlaying: nextState
    });
  }
  jumpBack() {
    this.audio.currentTime = this.audio.currentTime - 10;
  }
  jumpForward() {
    this.audio.currentTime = this.audio.currentTime + 10;
  }
  onPlayerReady() {
    this.setState({
      playerReady: true,
      duration: this.audio.duration
    });
  }
  onTimeUpdate() {
    const currentTime = this.audio.currentTime;
    this.setState({
      currentTime,
      progress: (currentTime / this.state.duration) * 100
    });
  }
  onProgressClick(event) {
    /**
      event.clientX // left position *from window* of mouse click
      let rect = node.getBoundingClientRect()
      rect.left // left position *of node from window*
      rect.width // width of node
     */
  }
  render() {
    return (
      <div className="audio-player">
        <PlayerContext.Provider value={this.state}>
          <audio
            src={this.props.source}
            onTimeUpdate={() => {
              this.onTimeUpdate();
            }}
            onLoadedData={() => {
              this.onPlayerReady();
            }}
            onEnded={null}
            ref={n => (this.audio = n)}
          />
          {this.props.children}
        </PlayerContext.Provider>
      </div>
    );
  }
}

class Play extends React.Component {
  render() {
    return (
      <PlayerContext.Consumer>
        {({
          isPlaying,
          toggleIsPlaying
        }) => {
          return (
            <button
              className="icon-button"
              onClick={() => {
                toggleIsPlaying();
              }}
              disabled={isPlaying ? true : false}
              title="play"
            >
              <FaPlay />
            </button>
          );
        }}
      </PlayerContext.Consumer>
    );
  }
}

class Pause extends React.Component {
  render() {
    return (
      <PlayerContext.Consumer>
        {({
          isPlaying,
          toggleIsPlaying
        }) => {
          return (
            <button
              className="icon-button"
              onClick={() => {
                toggleIsPlaying();
              }}
              disabled={isPlaying ? false : true}
              title="pause"
            >
              <FaPause />
            </button>
          );
        }}
      </PlayerContext.Consumer>
    );
  }
}

class PlayPause extends React.Component {
  render() {
    return (
      <PlayerContext.Consumer>
        {({
          isPlaying
        }) => {
          return (
            (isPlaying) ? <Pause /> : <Play />
          )
        }}
      </PlayerContext.Consumer>
    )
  }
}

class JumpForward extends React.Component {
  render() {
    return (
      <PlayerContext.Consumer>
        {({
          jumpForward
        }) => {
          return (
            <button
              className="icon-button"
              onClick={() => {
                jumpForward();
              }}
              disabled={null}
              title="Forward 10 Seconds"
            >
              <FaRepeat />
            </button>
          );
        }}
      </PlayerContext.Consumer>
    )
  }
}

class JumpBack extends React.Component {
  render() {
    return (
      <PlayerContext.Consumer>
        {({
          jumpBack
        }) => {
          return (
            <button
              className="icon-button"
              onClick={() => {
                jumpBack();
              }}
              disabled={null}
              title="Back 10 Seconds"
            >
              <FaRotateLeft />
            </button>
          );
        }}
      </PlayerContext.Consumer>
    )
  }
}

class Progress extends React.Component {
  render() {
    return (
      <PlayerContext.Consumer>
        {({
          progress
        }) => {
          return (
            <div className="progress" onClick={null}>
              <div
                className="progress-bar"
                style={{
                  width: `${progress}%`
                }}
              />
            </div>
          );
        }}
      </PlayerContext.Consumer>
    );
  }
}

let Exercise = () => (
  <div className="exercise">
    <AudioPlayer source={mario}>
      <Play /> <Pause /> <span className="player-text">Mario Bros. Remix</span>
      <Progress />
    </AudioPlayer>

    <AudioPlayer source={podcast}>
      <PlayPause /> <JumpBack /> <JumpForward />{" "}
      <span className="player-text">Workshop.me Podcast Episode 02</span>
      <Progress />
    </AudioPlayer>
  </div>
);

export default Exercise;
