import { Link } from "react-router-dom";
import styles from'./MainPage.module.scss';

const MainPage = () => {
    return (
        <div className ={styles['main-container']}>
        <div style={{ textAlign: "center", padding: "50px" }}>
            <h1>Welcome to Travel Itinerary Planner</h1>
            <p>Plan your perfect trip with ease!</p>

            <div style={{ marginTop: "20px" }}>
                <Link to="/register">
                    <button style={buttonStyle}>Register</button>
                </Link>
                <Link to="/login">
                    <button style={buttonStyle}>Login</button>
                </Link>
                <Link to="/UserHomePage">
                    <button style={buttonStyle}>Go to Home</button>
                </Link>
            </div>
        </div>
        </div>
    );
};

// CSS Styles for buttons
const buttonStyle: React.CSSProperties = {
    margin: "10px",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    borderRadius: "5px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
};

export default MainPage;
