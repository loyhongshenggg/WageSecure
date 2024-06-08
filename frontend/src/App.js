import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from "@chakra-ui/react";
import Signup from './pages/signup';
import Login from './pages/login';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Signup />} />
          <Route path="/CompanyDashboard" element={<TransactionViewer />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;

