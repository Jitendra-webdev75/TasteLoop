import axios from "axios";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
/**
 * One full-screen video in the feed.
 * Plays automatically once ~60% of it is visible, pauses when scrolled away.
 */
function VideoCard({ video }) {
  const videoRef = useRef(null);
  const likeCount = video.likeCount ?? 0;
  const commentCount = video.commentCount ?? 0;
  const saveCount = video.saveCount ?? 0;

  useEffect(() => {
    // const likeVideo = async (item) => {
    //   const response = await axios.post(
    //     "http://localhost:3000/api/food/like",
    //     { food: item._id },
    //     { withCredentials: true },
    //   );

    //   if(response.data.like){

    //   }
    // };

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
            <button className="reel-action-btn" type="button">
              <span className="reel-action-icon">♥</span>
              <span className="reel-action-count">{likeCount}</span>
            </button>
            <button className="reel-action-btn" type="button">
              <span className="reel-action-icon">💬</span>
              <span className="reel-action-count">{commentCount}</span>
            </button>
            <button className="reel-action-btn" type="button">
              <span className="reel-action-icon">🔖</span>
              <span className="reel-action-count">{saveCount}</span>
            </button>
          </div>
        </div>

        <div className="reel-footer">
          <div className="reel-footer-left">
            <span className="reel-footer-label">Explore more reels</span>
          </div>
          <div className="reel-footer-menu">
            <button className="reel-footer-btn" type="button">
              <span className="reel-footer-icon">🏠</span>
              Home
            </button>
            <button className="reel-footer-btn" type="button">
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
