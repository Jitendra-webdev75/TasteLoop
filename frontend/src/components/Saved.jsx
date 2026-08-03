import { useEffect, useState } from "react";
import axios from "axios";
import Videocard from "../general/Videocard";
import "../general/reels.css";

function Saved() {
  const [savedVideos, setSavedVideos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/food/save", {
        withCredentials: true,
      })
      .then((response) => {
        const savevideo = response.data.savevideo ?? [];
        const videos = savevideo.map((item) => item.food || item);
        setSavedVideos(videos.filter(Boolean));
      })
      .catch((error) => {
        console.error("Failed to fetch saved videos:", error);
        setSavedVideos([]);
      });
  }, []);

  return (
    <div className="reels-container">
      {savedVideos.length === 0 ? (
        <div className="empty-reels-message">No saved videos yet.</div>
      ) : (
        savedVideos.map((item) => <Videocard key={item._id} video={item} />)
      )}
    </div>
  );
}

export default Saved;
