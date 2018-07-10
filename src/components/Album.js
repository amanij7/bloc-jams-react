import React, { Component } from 'react';
import albumData from './../data/albums';

class Album extends Component {
  constructor(props){
    super(props);
    const album = albumData.find( album=> {
      return album.slug === this.props.match.params.slug
    });
    this.state = {
      album: album
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
        {this.state.album.songs.map((songs, index) =>
        <tr key={index}>
          <td>{index + 1 + '.'}</td>
          <td>{songs.title}</td>
          <td>{songs.duration}</td>
        </tr>
      )
    }
        </tbody>
      </table>
      </section>
    );
  }
}

export default Album;
