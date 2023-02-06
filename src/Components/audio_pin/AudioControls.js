import React from "react";
import { IoMdPlay } from "react-icons/io";
import {
  MdReplay10,
  MdOutlineForward10,
  MdVolumeUp,
  MdVolumeOff,
} from "react-icons/md";
import { AiOutlinePause } from "react-icons/ai";
import RangeInput from "./RangeInput";

const VideoControls = ({
  isPlaying,
  muted,
  setIsPlaying,
  setMuted,
  volume,
  setVolume,
  playerRef,
  played,
  setPlayed,
  setSeeking,
}) => {
  const handleFastRewind = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
  };

  const handleFastForward = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
  };

  const currentTime = playerRef.current
    ? playerRef.current.getCurrentTime()
    : "00:00";

  const duration = playerRef.current
    ? playerRef.current.getDuration()
    : "00:00";

  const format = (seconds) => {
    if (isNaN(seconds)) {
      return "00:00";
    }

    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes().toString().padStart(2, "0");
    const ss = date.getUTCSeconds().toString().padStart(2, "0");
    if (hh) {
      return `${hh}:${mm}:${ss}`;
    }
    return `${mm}:${ss}`;
  };

  const elapsedTime = format(currentTime);

  const totalDuration = format(duration);

  const handleSeekChange = (e) => {
    setPlayed(parseFloat(e.target.value / 100));
  };

  const onSeekMouseDown = (e) => {
    setSeeking(true);
  };

  const onSeekMouseUp = (e) => {
    setSeeking(false);
    playerRef.current.seekTo(e.target.value / 100);
  };

  return (
    <div className="absolute flex flex-col justify-between items-center z-10">
      <div
        className="flex items-center justify-center w-full h-full"
        onClick={() => {
          setIsPlaying((isPlaying) => !isPlaying);
        }}
      ></div>

      <div className="w-full items-center flex flex-col px-5 rounded-sm  bg-gradient-to-t from-gray-500 to-gray-500">
        <RangeInput
          min="0"
          max="100"
          value={played * 100}
          size={((played - 0) * 100) / (100 - 0)}
          onChange={handleSeekChange}
          onMouseDown={onSeekMouseDown}
          onMouseUp={onSeekMouseUp}
          width="100%"
          className="absolute left-3 right-3 top-1"
        />

        <div className="flex w-full items-center my-2 gap-6 pl-1 mt-8">
          <MdReplay10
            className="text-2xl text-[#f1f1f1] cursor-pointer"
            onClick={handleFastForward}
          />
          <div onClick={() => setIsPlaying((isPlaying) => !isPlaying)}>
            {!isPlaying ? (
              <IoMdPlay className="text-2xl text-[#f2f2f2] cursor-pointer" />
            ) : (
              <AiOutlinePause className="text-2xl text-[#f2f2f2] cursor-pointer" />
            )}
          </div>
          <MdOutlineForward10
            className="text-2xl text-[#f1f1f1] cursor-pointer"
            onClick={handleFastRewind}
          />
          <div className="items-center gap-6 w-6 flex">
            <div onClick={() => setMuted((muted) => !muted)}>
              {!muted ? (
                <MdVolumeUp className="text-2xl text-[#f1f1f1] cursor-pointer" />
              ) : (
                <MdVolumeOff className="text-2xl text-[#f1f1f1] cursor-pointer" />
              )}
            </div>
          </div>
          <RangeInput
            min="0"
            max="100"
            defaultValue={volume}
            onChange={(e) => {
              setVolume(e.target.value / 100);
              parseInt(e.target.value) === 0 ? setMuted(true) : setMuted(false);
            }}
            size={((volume - 0) * 100) / (100 - 0)}
            className="relative w-12 mr-0"
          />

          <div className="flex ml-3 items-center gap-2">
            <div className="text-lg text-[whitesmoke]">
              {elapsedTime ? elapsedTime : "00"}
            </div>
            <div className="text-lg text-[whitesmoke]">/</div>
            <div className="text-lg text-[whitesmoke]">
              {totalDuration ? totalDuration : "00"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoControls;
