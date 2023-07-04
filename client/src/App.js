import "./App.css";
import { Route, Switch, useLocation } from "react-router-dom";
import NavBar from "./Components/NavBar/navBar";
import {
  Landing,
  Register,
  Menu,
  Login,
  Form,
  About,
  Detail,
  DashBoard,
  RegisterGmail,
} from "./Views";
import UserProfile from "./Views/UserProfile/userProfile";
import Cart from "./Views/Cart/cart.jsx";
import NotFound from "./Components/NotFound/NotFound";

//import axios from "axios";
//axios.defaults.baseURL = "http://localhost:3001/";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== "/login" &&
        location.pathname !== "/register" &&
        location.pathname !== "/dashboard" && <NavBar />}
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/registergmail" component={RegisterGmail} />
        <Route exact path="/menu" component={Menu} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/about" component={About} />
        <Route exact path="/profile" component={UserProfile} />
        <Route
          exact
          path="/product/:id"
          render={({ match }) => <Detail id={match.params.id} />}
        />

        <Route exact path="/dashboard" component={DashBoard} />
        {/* Ruta 404 */}
        {/* <Route component={NotFound} /> */}
        <Route
          exact
          path="/cart/:userId"
          render={({ match }) => <Cart id={match.params.userId} />}
        />
      </Switch>
    </div>
  );
}

export default App;
