import React, { Component } from "react";
import * as $ from "jquery";
import { authEndpoint, clientId, redirectUri, scopes } from "./config";
import hash from "./hash";

import Playlists from "./components/Playlists";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
      no_playlists: true,
      no_tracks: true,
      playlists: [],
    };

    this.getPlaylists = this.getPlaylists.bind(this);
    this.getItems = this.getItems.bind(this);
  }

  componentDidMount() {
    // Set token
    let _token = hash.access_token;

    if (_token) {
      // Set token
      this.setState({
        token: _token,
      });
      this.getPlaylists(_token);
      this.getItems(_token);
    }

    // set interval for polling every 5 seconds
  }

  componentWillUnmount() {
    // clear the interval to save resources
  }

  getPlaylists(token) {
    $.ajax({
      url: "https://api.spotify.com/v1/me/playlists",
      type: "GET",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: (data) => {
        // Checks if the data is not empty
        if (!data) {
          this.setState({
            no_playlists: true,
          });
          return;
        }
        const keys_to_keep = ["id", "name", "tracks", "description"];
        const redux = (array) =>
          array.map((o) =>
            keys_to_keep.reduce((acc, curr) => {
              acc[curr] = o[curr];
              return acc;
            }, {})
          );
        let cleanedPlaylists = redux(data.items);

        this.setState(
          {
            playlists: cleanedPlaylists,
          },
          () => {
            this.getItems(token);
          }
        );
      },
    });
  }

  getItems(token) {
    // GET https://api.spotify.com/v1/playlists/{playlist_id}/tracks
    this.state.playlists.map((playlist, index) => {
      $.ajax({
        url: `https://api.spotify.com/v1/playlists/${playlist.id}/tracks`,
        type: "GET",
        beforeSend: (xhr) => {
          xhr.setRequestHeader("Authorization", "Bearer " + token);
        },
        success: (data) => {
          // Checks if the data is not empty
          if (!data) {
            this.setState({
              no_tracks: true,
            });
            return;
          }

          let updatedPlaylists = [...this.state.playlists];
          let item = { ...this.state.playlists[index] };
          item.tracks = data.items;
          updatedPlaylists[index] = item;

          return this.setState({
            playlists: updatedPlaylists,
          });
        },
      });
    });
    this.setState({
      no_playlists: false,
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <section>
          {!this.state.token && (
            <a
              className="btn btn--loginApp-link"
              href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                "%20"
              )}&response_type=token&show_dialog=true`}
            >
              Login to Spotify
            </a>
          )}
          {this.state.token && !this.state.no_playlists && (
            <>
              <Playlists playlists={this.state.playlists} />
            </>
          )}
          {this.state.token && this.state.no_playlists && (
            <>
              <p>no playlists!</p>
            </>
          )}
        </section>
      </div>
    );
  }
}

export default App;
