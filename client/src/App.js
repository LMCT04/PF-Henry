import "./App.css";
import { Route, useLocation } from "react-router-dom";
import NavBar from "./Components/NavBar/navBar";
import { Landing, Register, Menu, Login, Form } from "./Views";
//import axios from "axios";
//axios.defaults.baseURL = "http://localhost:3001/";

function App() {
    const location = useLocation();

    return (
        <div className="App">

{location.pathname !== "/" && location.pathname !== "/login" && location.pathname !== "/register" && <NavBar />}

            <Route exact path= "/" component = { Landing } />
            <Route exact path= "/register" component = { Register } />
            <Route exact path= "/menu" component = { Menu } />
            <Route exact path= "/login" component = { Login } />
            <Route exact path= "/create" component = { Form } />

        </div>
    );
}

export default App;
