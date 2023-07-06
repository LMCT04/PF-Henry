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
import Checkout from "./Views/Checkout/Checkout";
import RatingAndReview from "./Views/RatingAndReview/RatingAndReview";
//import axios from "axios";
//axios.defaults.baseURL = "http://localhost:3001/";

function App() {
  const location = useLocation();
  const roleUser = JSON.parse(window.localStorage.getItem("loggedInUser"));

  return (
    <div className="App">
      {location.pathname !== "/dashboard" && <NavBar />}
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/registergmail" component={RegisterGmail} />
        <Route exact path="/menu" component={Menu} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/about" component={About} />
        {(roleUser?.role === "admin" ||
          roleUser?.role === "superAdmin" ||
          roleUser?.role === "user") && (
          <Route exact path="/profile" component={UserProfile} />
        )}

        <Route
          exact
          path="/product/:id"
          render={({ match }) => <Detail id={match.params.id} />}
        />

        {(roleUser?.role === "admin" || roleUser?.role === "superAdmin") && (
          <Route exact path="/dashboard" component={DashBoard} />
        )}

        <Route
          exact
          path="/cart/:userId"
          render={({ match }) => <Cart id={match.params.userId} />}
        />
        <Route path="/checkout" component={Checkout} />
        <Route path="/review" component={RatingAndReview} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
