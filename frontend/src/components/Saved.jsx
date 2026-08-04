import { useEffect, useState } from "react";
import axios from "axios";
import Videocard from "../general/Videocard";
import "../general/reels.css";

function Saved() {
  const [savedVideos, setSavedVideos] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  const loadSavedVideos = () => {
    axios
      .get("https://tasteloop.onrender.com/api/food/save", {
        withCredentials: true,
      })
      .then((response) => {
        const savevideo = response.data.savevideo ?? [];
        const videos = savevideo
          .map((item) => item.food || item)
          .filter((video) => video && video._id && video.video);
        setSavedVideos(videos);
      })
      .catch((error) => {
        console.error("Failed to fetch saved videos:", error);
        setSavedVideos([]);
      });
  };

  useEffect(() => {
    loadSavedVideos();
  }, [refreshKey]);

  const handleSaveToggle = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="reels-container">
      {savedVideos.length === 0 ? (
        <div className="empty-reels-message">No saved videos yet.</div>
      ) : (
        savedVideos.map((item) => (
          <Videocard
            key={item._id}
            video={item}
            onSaveChange={handleSaveToggle}
          />
        ))
      )}
    </div>
  );
}

export default Saved;
