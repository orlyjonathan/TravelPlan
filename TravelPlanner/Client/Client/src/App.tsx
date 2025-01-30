import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./components/Register"; 
import LoginPage from "./components/Login"; 
import UserHomePage from "./components/UserHomePage"; 
import MainPage from "./components/MainPage";


function App() {
    return (
        <Router>
            <Routes>
            <Route path="/" element={<MainPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/UserHomePage" element={<UserHomePage />} />
                <Route path="*" element={<h2>404 - Page Not Found</h2>} />
            </Routes>
        </Router>
    );
}

export default App;
