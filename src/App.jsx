import React from 'react'
import { BrowserRouter as Router } from "react-router-dom";
import { Analytics } from '@vercel/analytics/react';
import Navbar from './pages/Templates/Navbar';
import Footer from './pages/Templates/Footer'
import Navegacion from './pages/Templates/Navegacion';
import Breadcrumb from './pages/Templates/Breadcrumb';
import { AuthProvider } from "./context/authContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar/>
        <Breadcrumb/>
        <Navegacion/>
        <Footer/>
      </Router>
      <Analytics />
    </AuthProvider>
  );
}

export default App;
