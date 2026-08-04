import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Videocard from "../general/Videocard";
import "../general/reels.css";

function Home() {
  const [foodItems, setFoodItems] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
    setLoading(false);

    if (token) {
      axios
        .get("https://tasteloop.onrender.com/api/food/", {
          withCredentials: true,
        })
        .then((response) => {
          setFoodItems(response.data.foodItem);
        })
        .catch((error) => {
          console.error("Failed to fetch food items:", error);
        });
    }
  }, []);

  if (loading) {
    return <div className="reels-container">Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="reels-container" style={styles.popupContainer}>
        <div style={styles.popupBox}>
          <h2 style={styles.popupTitle}>Please Log In</h2>
          <p style={styles.popupText}>
            You need to log in to see reels and explore delicious food!
          </p>
          <button
            style={styles.loginButton}
            onClick={() => navigate("/user/login")}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="reels-container">
      {foodItems.map((item) => (
        <Videocard key={item._id} video={item} />
      ))}
    </div>
  );
}

const styles = {
  popupContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
  },
  popupBox: {
    backgroundColor: "white",
    padding: "40px",
    borderRadius: "15px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    maxWidth: "400px",
    width: "90%",
  },
  popupTitle: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "15px",
    color: "#333",
  },
  popupText: {
    fontSize: "16px",
    color: "#666",
    marginBottom: "30px",
    lineHeight: "1.5",
  },
  loginButton: {
    backgroundColor: "#ff6b35",
    color: "white",
    border: "none",
    padding: "12px 30px",
    fontSize: "16px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background-color 0.3s ease",
  },
};

export default Home;
