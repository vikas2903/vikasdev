import "./App.css";
import Homepage from "./components/Homepage.jsx";
import ProjectsPage from "./components/ProjectsPage.jsx";
import Signuppage from "./components/Signuppage.jsx";
import Loginpage from "./components/Loginpage.jsx";
import ForgotPasswordPage from "./components/ForgotPasswordPage.jsx";
import OtpVerificationPage from "./components/OtpVerificationPage.jsx";
import ResetPasswordPage from "./components/ResetPasswordPage.jsx";
import UpdateProfilePage from "./components/UpdateProfilePage.jsx";
import Chatpage from "./components/Chatpage.jsx";
import Cartdrawer1 from "./components/Cartdrawer1.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/chat" element={<Chatpage />} />
            <Route path="/login" element={<Loginpage />} />
            <Route path="/signup" element={<Signuppage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/verify-otp" element={<OtpVerificationPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/update-profile" element={<UpdateProfilePage />} />
            <Route path="/cartdrawer1" element={<Cartdrawer1 open={true} onClose={() => {}} />}/>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
