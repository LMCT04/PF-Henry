import "./App.css";
import { Route, useLocation } from "react-router-dom";
import NavBar from "./Components/NavBar/navBar";
import { Home, Landing, Menu } from "./Views";
//import axios from "axios";
//axios.defaults.baseURL = "http://localhost:3001/";

function App() {
    const location = useLocation();

    return (
        <div className="App">

            {location.pathname !== "/" && <NavBar />}   

            <Route exact path = '/' component = { Landing } />
            <Route path = '/home' component = { Home } />
            <Route path= "/menu" component = { Menu } />

        </div>
    );
}

export default App;
