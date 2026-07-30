import { useState } from "react";
import UserRoute from "./routes/UserRoute";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <UserRoute></UserRoute>
    </>
  );
}

export default App;
