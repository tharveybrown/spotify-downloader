import React from "react";
import Playlist from "./Playlist";

function renderPlaylists(playlists) {
  return playlists.map((playlist) => {
    return <Playlist playlist={playlist} />;
  });
}

const Playlists = (props) => {
  return <div className="App">{renderPlaylists(props.playlists)}</div>;
};

export default Playlists;
