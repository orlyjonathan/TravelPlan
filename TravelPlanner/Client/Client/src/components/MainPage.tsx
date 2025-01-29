import { Link } from "react-router-dom";

const MainPage = () => {
    return (
        <div>
            <h1>Welcome to Travel Itinerary Planner</h1>
            <Link to="/register"><button>Register</button></Link>
            <Link to="/login"><button>Login</button></Link>
            <Link to="/UserHomePage"><button>Go to Home</button></Link>
        </div>
    );
};

export default MainPage;
