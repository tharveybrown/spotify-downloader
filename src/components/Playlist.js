import React from "react";

const Playlist = (props) => {
  const { playlist } = props;
  return (
    <div>
      <h3>{playlist.name}</h3>
    </div>
  );
};

export default Playlist;
