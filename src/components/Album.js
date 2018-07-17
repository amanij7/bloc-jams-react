import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';

class Album extends Component {
  constructor(props){
    super(props);
    const album = albumData.find( album=> {
      return album.slug === this.props.match.params.slug
    });
    this.state = {
      album: album,
      currentSong: album.songs[0],
      currentTime: 0,
      duration: album.songs[0].duration,
      volume:0.8,
      isPlaying: false,
    };
    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
  }
  play() {
    this.audioElement.play();
    this.setState({isPlaying: true});
  }
  pause() {
    this.audioElement.pause();
    this.setState({ isPlaying: false});
  }
  componentDidMount() {
    this.eventListeners = {
      timeupdate: e => {
       this.setState({ currentTime: this.audioElement.currentTime });
      },
      durationchange: e => {
        this.setState({ duration: this.audioElement.duration });
      },
      volumechange: e => {
        this.setState({ volume: this.audioElement.volume });
      }
    };
     this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
     this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
     this.audioElement.addEventListener('volumechange', this.eventListeners.volumechange);
  }
  componentWilUnmount() {
     this.audioElement.src = null;
     this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
     this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
     this.audioElement.removeEventListener('volumechange', this.eventListeners.volumechange);
  };
  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song });
  }
  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong) {
      this.pause();
    }
    else {
      if (!isSameSong) { this.setSong(song); }
      this.play();
    }
  }
  hoverOn (song) {
     this.setState ({hover:song});
   }

   hoverOff (song) {
     this.setState ({hover:null});
   }
   button (song, index) {
     if (this.state.currentSong === song && this.state.isPlaying){
       return <span className="icon ion-md-pause"></span>
    }
    else if (this.state.hover === song) {
       return <span className="icon ion-md-play"></span>
        }
     else {
       return (index + 1)
        }
    }
    handlePrevClick() {
     const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
     const newIndex = Math.max(0, currentIndex - 1);
     const newSong = this.state.album.songs[newIndex];
     this.setSong(newSong);
     this.play();
   }
   handleNextClick() {
     const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
      const newIndex = Math.min(4, currentIndex+1);
      const newSong = this.state.album.songs[newIndex];
      this.setSong(newSong);
      this.play();
     }
  handleTimeChange(e) {
       const newTime = this.audioElement.duration * e.target.value;
        this.audioElement.currentTime = newTime;
        this.setState({ currentTime: newTime });
      }
  handleVolumeChange(e) {
    const newVolume = e.target.value;
    this.audioElement.volume = newVolume
    this.setState({ volume: newVolume});
  }
  formatTime(time) {
    const seconds = time/60
    const minutes = time*60
    if (time == undefined){
      return "-:--";
    }
    else {
      return time;
    }
  }

  render() {
    return (
      <section className="album">
      <section id="album-info">
        <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title} />
        <div className="album-details">
            <h1 id="album-title"></h1>
            <h2 className="artist"></h2>
            <div id="release-info"></div>
          </div>
        </section>
      <table is="song-list">
        <colgroup>
          <col id="song-number-column" />
          <col id="song-title-column" />
          <col id="song-duration-column" />
        </colgroup>
        <tbody>
        {this.state.album.songs.map((song, index) =>
        <tr className="song" key={index} onClick={() => this.handleSongClick(song)}>
          <td
          onMouseEnter={() => this.hoverOn(song)}
          onMouseLeave={() => this.hoverOff(song)}>
          {this.button(song, index)}
          </td>
          <td>{song.title}</td>
          <td>{song.duration}</td>
        </tr>
      )
    }
    </tbody>
    </table>
    <PlayerBar
       isPlaying={this.state.isPlaying}
       currentSong={this.state.currentSong}
       currentTime={this.audioElement.currentTime}
       duration={this.audioElement.duration}
       volume={this.audioElement.volume}
       handleSongClick={() => this.handleSongClick(this.state.currentSong)}
       handlePrevClick={() => this.handlePrevClick()}
       handleNextClick={() => this.handleNextClick()}
       handleTimeChange={(e) => this.handleTimeChange(e)}
       handleVolumeChange={(e) => this.handleVolumeChange(e)}
       formatTime={(time) => this.formatTime(time)}
     />
  </section>
    );
  }
}

export default Album;
