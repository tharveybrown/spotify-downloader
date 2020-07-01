import React from "react";
import Playlist from "./Playlist";

function renderPlaylists(playlists) {
  return playlists.map((playlist) => {
    return <Playlist playlist={playlist} />;
  });
}
const Playlists = (props) => {
  return (
    <div className="App">
      HI
      {/* <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item active" aria-current="page">
            Home
          </li>
        </ol>
      </nav> */}
      <button type="button" className="btn btn-primary">
        Primary
      </button>
      {renderPlaylists(props.playlists)}
    </div>
  );
};

export default Playlists;
