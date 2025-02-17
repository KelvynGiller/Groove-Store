import React, { useEffect, useState } from "react";
import axios from "axios";

const CoverImage = ({ songName, artistName }) => {
  const [coverUrl, setCoverUrl] = useState("");

  useEffect(() => {
    const getCover = async () => {
      try {
        const query = encodeURIComponent(`${songName} ${artistName}`);
        const response = await axios.get(
          `https://itunes.apple.com/search?term=${query}&entity=song&limit=1`
        );
        const url = response.data.results[0]?.artworkUrl100;
        if (url) {
          setCoverUrl(url);
        }
      } catch (error) {
        console.error("Error fetching cover image:", error);
      }
    };

    getCover();
  }, [songName, artistName]);

  return coverUrl ? (
    <img
      src={coverUrl}
      alt={`${songName} cover`}
      className="w-full h-full object-cover rounded-full"
    />
  ) : null;
};

export default CoverImage;