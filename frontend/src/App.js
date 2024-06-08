import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from "@chakra-ui/react";
import Signup from './pages/signup';
import Login from './pages/login';
import CompanyDashboard from './pages/companyDashboard';
import CreateJobForm from './pages/createJobForm';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Signup />} />
          <Route path="/companyDashboard" element={<CompanyDashboard />} />
          <Route path="/createJob" element={<CreateJobForm />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
