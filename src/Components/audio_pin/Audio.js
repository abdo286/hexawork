import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import AudioControls from "./AudioControls";

const Video = ({ audioURL }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [played, setPlayed] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const playerRef = useRef();
  const playerContainer = useRef();

  const handleProgress = (changeState) => {
    if (!seeking) {
      setPlayed(parseFloat(changeState.played / 100) * 100);
    }
  };
  useEffect(() => {}, [muted, volume, played]);

  return (
    <div className="relative w-fit h-fit mb-16" ref={playerContainer}>
      <ReactPlayer
        url={audioURL}
        width="fit-content"
        height="fit-content"
        playing={isPlaying}
        muted={muted}
        volume={volume}
        ref={playerRef}
        onProgress={handleProgress}
        config={{
          file: {
            forceAudio: true,
          },
        }}
      />
      <AudioControls
        isPlaying={isPlaying}
        muted={muted}
        setIsPlaying={setIsPlaying}
        setMuted={setMuted}
        volume={volume}
        setVolume={setVolume}
        playerRef={playerRef}
        played={played}
        setPlayed={setPlayed}
        setSeeking={setSeeking}
        playerContainer={playerContainer}
      />
    </div>
  );
};

export default Video;
