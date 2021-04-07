import React, { createContext, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Admin from "./components/Admin/Admin";
import Login from "./components/Login/Login";
import NotFound from "./components/NotFound/NotFound";
import Checkout from "./components/Checkout/Checkout";
import Orders from "./components/Orders/Orders";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

export const CartContext = createContext();
export const UserContext = createContext();

const App = () => {

  const [cart, setCart] = useState([])
  const [loggingUser, setLoggingUser] = useState({})

  return (
    <CartContext.Provider value={[cart, setCart]}>
      <UserContext.Provider value={[loggingUser, setLoggingUser]}>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <PrivateRoute path="/admin">
              <Admin />
            </PrivateRoute>

            <Route path="/login">
              <Login />
            </Route>



            <PrivateRoute path="/checkout">
              <Checkout />
            </PrivateRoute>

            <PrivateRoute path="/orders">
              <Orders />
            </PrivateRoute>

            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </UserContext.Provider>
    </CartContext.Provider>
  );
};

export default App;
