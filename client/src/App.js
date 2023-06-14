import "./App.css";
import { Route, useLocation } from "react-router-dom";
import NavBar from "./Components/NavBar/navBar";
import { Home, Landing, Menu, Login, Form } from "./Views";
//import axios from "axios";
//axios.defaults.baseURL = "http://localhost:3001/";

function App() {
    const location = useLocation();

    return (
        <div className="App">

{location.pathname !== "/" && location.pathname !== "/login" && <NavBar />}

            <Route exact path = '/' component = { Landing } />
            <Route path = '/home' component = { Home } />
            <Route path= "/menu" component = { Menu } />
            <Route path= "/login" component = { Login } />
            <Route path= "/form" component = { Form } />

        </div>
    );
}

export default App;
