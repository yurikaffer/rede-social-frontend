import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home/Home';
import Register from './pages/Register';
import ProtectedRoute from './components/Route/ProtectedRoute';
import UserProfile from './pages/UserProfile';
import { UserProvider } from './context/UserContext';
import { PostListProvider } from './context/PostListContext';
import theme from './theme';
import { ThemeProvider } from '@mui/material/styles';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <PostListProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/home" element={<ProtectedRoute path="/home" element={<Home />} />} />
              <Route path="/user/:userId" element={<ProtectedRoute path="/user/:userId" element={<UserProfile />} />} />
              <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
          </Router>
        </PostListProvider>
      </UserProvider>
      </ThemeProvider>
  );
};

export default App;