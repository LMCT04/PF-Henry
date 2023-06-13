import "./App.css";
import { Route, useLocation, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar/navBar";
import Home from "./Views/Home";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3001/";

function App() {
    const location = useLocation();

    return (
        <div className="App">
            {location.pathname !== "/" && <NavBar />}
            <Routes>
                <Route path="/home" render={() => <Home />} />
            </Routes>
        </div>
    );
}

export default App;
