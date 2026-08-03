import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RiHeartLine, RiHeartFill } from "@remixicon/react";
/**
 * One full-screen video in the feed.
 * Plays automatically once ~60% of it is visible, pauses when scrolled away.
 */
function VideoCard({ video, onSaveChange }) {
  const videoRef = useRef(null);
  const likeCount = video.likeCount ?? 0;
  const commentCount = video.commentCount ?? 0;
  const saveCount = video.saveCount ?? 0;
  const [count, setcount] = useState(video.likeCount ?? 0);
  const [bookmarkcount, setBookmarkcount] = useState(video.saveCount ?? 0);
  const [likeicon, setLikeicon] = useState(<RiHeartLine />);

  const likeVideo = async (item) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/food/like",
        { foodId: item._id },
        { withCredentials: true },
      );

      const createLike = response.data.createLike;
      if (createLike) {
        setLikeicon(<RiHeartFill color="red" />);
        setcount((prev) => prev + 1);
      } else {
        setLikeicon(<RiHeartLine />);
        setcount((prev) => Math.max(0, prev - 1));
      }
    } catch (error) {
      console.error("Like request failed", error);
    }
  };
  const saveVideo = async (item) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/food/save",
        { foodId: item._id },
        { withCredentials: true },
      );

      const createBookmark = response.data.createSave;
      if (createBookmark) {
        setBookmarkcount((prev) => prev + 1);
      } else {
        setBookmarkcount((prev) => Math.max(0, prev - 1));
      }

      if (typeof onSaveChange === "function") {
        onSaveChange();
      }
    } catch (error) {
      console.error("Bookmark request failed", error);
    }
  };

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.play().catch(() => {
              // Autoplay can be blocked before user interaction — safe to ignore.
            });
          } else {
            el.pause();
          }
        });
      },
      { threshold: 0.6 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const navigate = useNavigate();
  const location = useLocation();
  const isHomeActive = location.pathname === "/";
  const isSavedActive = location.pathname === "/saved";

  return (
    <div className="reel-card">
      <video
        ref={videoRef}
        className="reel-video"
        src={video.video}
        loop
        muted
        playsInline
        preload="metadata"
      />

      <div className="reel-overlay">
        <div className="reel-meta-row">
          <div className="reel-meta-left">
            <p className="reel-store-name">{video.title}</p>
            <p className="reel-description">{video.desc}</p>
            <Link
              className="reel-visit-btn"
              to={"/food-partner/" + video.food_Partner}
            >
              Visit store
            </Link>
          </div>

          <div className="reel-actions">
            <button
              onClick={() => likeVideo(video)}
              className="reel-action-btn"
              type="button"
            >
              <span className="reel-action-icon">{likeicon}</span>
              <span className="reel-action-count">{count}</span>
            </button>
            <button className="reel-action-btn" type="button">
              <span className="reel-action-icon">💬</span>
              <span className="reel-action-count">{commentCount}</span>
            </button>
            <button
              onClick={() => saveVideo(video)}
              className="reel-action-btn"
              type="button"
            >
              <span className="reel-action-icon">🔖</span>
              <span className="reel-action-count">{bookmarkcount}</span>
            </button>
          </div>
        </div>

        <div className="reel-footer">
          <div className="reel-footer-left">
            <span className="reel-footer-label">Explore more reels</span>
          </div>
          <div className="reel-footer-menu">
            <button
              className={`reel-footer-btn ${isHomeActive ? "active" : ""}`}
              type="button"
              onClick={() => navigate("/")}
            >
              <span className="reel-footer-icon">🏠</span>
              Home
            </button>
            <button
              className={`reel-footer-btn ${isSavedActive ? "active" : ""}`}
              type="button"
              onClick={() => navigate("/saved")}
            >
              <span className="reel-footer-icon">💾</span>
              Saved
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoCard;
