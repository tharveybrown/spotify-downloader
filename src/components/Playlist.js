import React from "react";
import Track from "./Track";

function renderTracks(playlist) {
  console.log(playlist);
  if (playlist.tracks) {
    playlist.tracks.map((track) => <Track track={track} id={playlist.id} />);
  }
}

const Playlist = ({ playlist }) => {
  return (
    <div id="accordion">
      <div className="card">
        <div class="card-header" id={playlist.id}>
          <h5 class="mb-0">
            <button
              class="btn btn-link"
              data-toggle="collapse"
              data-target={`#${playlist.id}`}
              aria-expanded="true"
              aria-controls={playlist.id}
            >
              {playlist.name}
            </button>
          </h5>
        </div>
        {renderTracks(playlist)}
      </div>
    </div>
  );
};

export default Playlist;
