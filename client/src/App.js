import "./App.css";
import { Route, useLocation } from "react-router-dom";
import NavBar from "./Components/NavBar/navBar";
import { Home, Landing } from "./Views";
import Menu from './components/views/menu/menu';
//import axios from "axios";
//axios.defaults.baseURL = "http://localhost:3001/";

function App() {
    const location = useLocation();

    return (
        <div className="App">

            {location.pathname !== "/" && <NavBar />}   

            <Route path = '/home' component = { Home } />
            <Route exact path = '/' component = { Landing } />
            <Route path= "/menu" element={<Menu/>} />

        </div>
    );
}

export default App;
