import React, { useState } from "react";
import LinkedList from "./LinkedList";


const playlist = new LinkedList();

const LinkedListPage = () => {
  const [currentSong, setCurrentSong] = useState(playlist.getCurrentSong());

  const handleNext = () => {
    playlist.nextSong();
    setCurrentSong(playlist.getCurrentSong());
  };

  const handleReset = () => {
    playlist.reset();
    setCurrentSong(playlist.getCurrentSong());
  };

  return (
    <div>
      <h1>Music Player</h1>
      <p>Now Playing: <strong>{currentSong}</strong></p>
      <button onClick={handleNext} disabled={currentSong === "No more songs"}>Next</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default LinkedListPage;
