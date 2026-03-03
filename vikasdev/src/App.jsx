import { useState } from 'react'
import './App.css'
import Signuppage from './components/Signuppage.jsx';
import Loginpage from './components/Loginpage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Loginpage />} />
          <Route path="/signup" element={<Signuppage />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
