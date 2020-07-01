import React from "react";

const Track = ({ track, id }) => {
  console.log("TRACK", track);
  return (
    <div
      id={id}
      class="collapse show"
      aria-labelledby={id}
      data-parent="#accordion"
    >
      <div class="card-body">{track.name} HIII</div>
    </div>
  );
};

export default Track;
