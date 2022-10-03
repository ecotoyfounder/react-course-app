import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./layouts/login";
import Main from "./layouts/main";
import NavBar from "./components/navBar";
import UsersList from "./components/usersList";

function App() {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/users/:userId?" component={UsersList} />
        <Route path="/login" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
