import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { ToastContainer } from "react-toastify";

import SignupForm from './pages/signupForm';
import LoginForm from './pages/LoginForm';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import MyProfile from './components/Dashboard/MyProfile';
import { AddSessions } from './components/Dashboard/AddSessions';
import ViewSessions from './components/Dashboard/ViewSessions'; 
import ViewmySessions from './components/Dashboard/ViewmySessions';
import ViewSession from './components/Dashboard/ViewSession';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route element={<Dashboard />}>
          <Route path="/dashboard/my-profile" element={<MyProfile />} />
          <Route path="/dashboard/add-sessions" element={<AddSessions />} />
          <Route path="/dashboard/all-sessions" element={<ViewSessions />} />
          <Route path="/dashboard/my-sessions" element={<ViewmySessions/>}/>
          <Route path="/dashboard/all-sessions/dashboard/view" element={<ViewSession/>}/>
        </Route>
      </Routes>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}

export default App;
