import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FaPlay, FaPause } from "react-icons/fa";

const AudioPlayer = ({ songName, artistName }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [songUrl, setSongUrl] = useState("");

  const getPreviewUrl = async () => {
    if (!songName || !artistName) return;
    try {
      const response = await axios.get(
        `https://itunes.apple.com/search?term=${songName}+${artistName}&entity=song&limit=1`
      );
      const url = response.data.results[0]?.previewUrl;
      if (url) {
        setSongUrl(url);
      }
    } catch (error) {
      console.error("Error fetching preview URL:", error);
    }
  };

  useEffect(() => {
    getPreviewUrl();
  }, [songName, artistName]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.onloadedmetadata = () => {
        setDuration(audioRef.current.duration);
      };
      audioRef.current.ontimeupdate = () => {
        setProgress(audioRef.current.currentTime);
      };
    }
  }, [songUrl]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (event) => {
    if (!audioRef.current) return;
    const seekTime =
      (event.nativeEvent.offsetX / event.target.offsetWidth) * duration;
    audioRef.current.currentTime = seekTime;
    setProgress(seekTime);
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-[#242629] p-4 flex flex-col md:flex-row items-center">
      {songUrl ? (
        <>
          <audio ref={audioRef} src={songUrl} preload="auto" />
          <div className="flex items-center text-white mb-2 md:mb-0 md:mr-4">
            <p className="mr-2 font-semibold">{songName}</p>
            <p className="text-gray-400">{artistName}</p>
          </div>
          <button
            onClick={togglePlay}
            className="bg-[#2CB67D] text-white p-2 rounded-full text-2xl"
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <div className="w-full mt-2 md:mt-0 md:ml-4 cursor-pointer" onClick={handleSeek}>
            <div className="bg-gray-600 w-full h-2 rounded">
              <div
                className="bg-[#7F5AF0] h-2 rounded"
                style={{ width: `${(progress / duration) * 100}%` }}
              />
            </div>
          </div>
        </>
      ) : (
        <p className="text-white">Loading preview...</p>
      )}
    </div>
  );
};

export default AudioPlayer;