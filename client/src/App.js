import "./App.css";
import { Route, useLocation } from "react-router-dom";
import NavBar from "./Components/NavBar/navBar";
import Home from "./Views/Home";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3001/";

function App() {
    const location = useLocation();

    return (
        <div className="App">
            {location.pathname !== "/" && <NavBar />}            
                <Route path="/home" render={() => <Home />} />            
        </div>
    );
}

export default App;
