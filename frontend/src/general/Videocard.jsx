import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
/**
 * One full-screen video in the feed.
 * Plays automatically once ~60% of it is visible, pauses when scrolled away.
 */
function VideoCard({ video }) {
  const videoRef = useRef(null);

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
        <p className="reel-store-name">{video.title}</p>
        <p className="reel-description">{video.desc}</p>
        <Link
          className="reel-visit-btn"
          to={"/food-partner/" + video.food_Partner}
        >
          Visit store
        </Link>
      </div>
    </div>
  );
}

export default VideoCard;
