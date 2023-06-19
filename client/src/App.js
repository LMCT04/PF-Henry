import "./App.css";
import { Route, useLocation } from "react-router-dom";
import NavBar from "./Components/NavBar/navBar";
import NavLand from "./Components/NavBarLanding/navLand";
import Detail from "./Views/Detail/detail";
import { Landing, Register, Menu, Login, Form, About } from "./Views";

//import axios from "axios";
//axios.defaults.baseURL = "http://localhost:3001/";

function App() {
    const location = useLocation();

    return (
        <div className="App">

{location.pathname=== "/"  && <NavLand />}
{location.pathname!== "/" && location.pathname !== "/login" && location.pathname !== "/register" && <NavBar />}

            <Route exact path= "/" component = { Landing } />
            <Route exact path= "/register" component = { Register } />
            <Route exact path= "/menu" component = { Menu } />
            <Route exact path= "/login" component = { Login } />
            <Route exact path= "/create" component = { Form } />
            <Route exact path= "/about" component = { About } />


            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/menu" component={Menu} />
            <Route
                exact
                path="/product/:id"
                render={({ match }) => <Detail id={match.params.id} />}
            />
            <Route exact path="/login" component={Login} />
            <Route exact path="/create" component={Form} />
        </div>
    );
}

export default App;
