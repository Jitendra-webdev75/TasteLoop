import { useEffect, useState } from "react";
import axios from "axios";
import Videocard from "../general/Videocard";
import "../general/reels.css";

function Home() {
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/food/", {
        withCredentials: true,
      })
      .then((response) => {
        setFoodItems(response.data.foodItem);
        // console.log(response);
      })
      .catch((error) => {
        console.error("Failed to fetch food items:", error);
      });
  }, []);

  return (
    <div className="reels-container">
      {foodItems.map((item) => (
        <Videocard key={item._id} video={item} />
      ))}
    </div>
  );
}

export default Home;
