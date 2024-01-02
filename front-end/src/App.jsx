import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from './context/AuthProvider';
import AuthUser from './middleware/AuthUser';
import NavBar from './components/layout/NavBar';
import ChatLayout from './components/layout/ChatLayout';
import { ErrorMessage } from './components/layout/ErrorMessage';
import Signup from './components/user/Signup';
import Login from './components/user/Login';

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <ErrorMessage />
        <Routes>
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route
            exact
            path="/"
            element={
              <AuthUser>
                <ChatLayout />
              </AuthUser>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App
