import "./App.css";
import Signuppage from "./components/Signuppage.jsx";
import Loginpage from "./components/Loginpage.jsx";
import Chatpage from "./components/Chatpage.jsx";
import Cartdrawer1 from "./components/Cartdrawer1.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Chatpage />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/signup" element={<Signuppage />} />
          
          <Route
            path="/cartdrawer1"
            element={<Cartdrawer1 open={true} onClose={() => {}} />}
          />

        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
