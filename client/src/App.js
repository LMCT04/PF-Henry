import "./App.css";
import { Route, useLocation } from "react-router-dom";
import NavBar from "./Components/NavBar/navBar";
import { Home, Landing } from "./Views";
//import axios from "axios";
//axios.defaults.baseURL = "http://localhost:3001/";

function App() {
    const location = useLocation();

    return (
        <div className="App">

            {location.pathname !== "/" && <NavBar />}   

            <Route path = '/home' component = { Home } />
            <Route exact path = '/' component = { Landing } />

        </div>
    );
}

export default App;
