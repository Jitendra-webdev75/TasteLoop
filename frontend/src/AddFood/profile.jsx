import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "../pages/Auth.css";
import "./profile.css";
import { useEffect, useState } from "react";

const profileVideos = Array.from({ length: 9 }, (_, index) => ({
  id: index + 1,
  label: `Food video ${index + 1}`,
}));

function formatPartnerName(value) {
  if (!value) return "Basil & Bloom";

  return value
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function Profile() {
  const { id } = useParams();
  const partnerName = formatPartnerName(id);
  const [profile, setProfile] = useState(null);
  const [video, setVideo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`https://tasteloop.onrender.com/api/food-partner/${id}`)
      .then((response) => {
        setProfile(response.data.foodPartnerDetail);
        setVideo(response.data.foodPartnerDetail.foodItems);
        setError("");
      })
      .catch((error) => {
        setError(
          error.response?.data?.message ||
            "Unable to load food partner profile.",
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);
  return (
    <main className="partner-profile">
      <section className="partner-profile__card" aria-label={` profile`}>
        <header className="partner-profile__header">
          <div className="partner-profile__avatar" aria-hidden="true">
            {partnerName.charAt(0)}
          </div>

          <div className="partner-profile__identity">
            <h1>
              {loading
                ? "Loading profile..."
                : profile?.fullname || partnerName}
            </h1>
            <p>{error || profile?.email}</p>
          </div>
        </header>

        <div className="partner-profile__location">
          <span aria-hidden="true">⌖</span>
          <span>{profile?.address || "Address not available"}</span>
        </div>

        <dl className="partner-profile__stats">
          <div>
            <dt>Total meals</dt>
            <dd>43</dd>
          </div>
          <div>
            <dt>Customer serve</dt>
            <dd>15K</dd>
          </div>
        </dl>

        <div className="partner-profile__divider" />

        <section
          className="partner-profile__videos"
          aria-label="Food videos"
          style={{ padding: "15px" }}
        >
          {video.map((video) => (
            <div key={video._id} className="profile-grid-item">
              <video src={video.video} muted className="profile-grid-video" />
            </div>
          ))}
        </section>
      </section>
    </main>
  );
}

export default Profile;
