import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Userregister from "../components/Userregister";
import Userlogin from "../components/Userlogin";
import Foodpartnerregister from "../components/Foodpartnerregister";
import Foodpartnerlogin from "../components/Foodpartnerlogin";
import Home from "../components/Home";
import Food from "../AddFood/Food";
function UserRoute() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/user/register" element={<Userregister />} />
        <Route path="/user/login" element={<Userlogin />} />
        <Route
          path="/food-partner/register"
          element={<Foodpartnerregister />}
        />
        <Route path="/food-partner/login" element={<Foodpartnerlogin />} />
        <Route path="/food" element={<Food />} />
      </Routes>
    </Router>
  );
}

export default UserRoute;
