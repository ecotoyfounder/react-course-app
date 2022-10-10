import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./layouts/login";
import Main from "./layouts/main";
import NavBar from "./components/ui/navBar";
import Users from "./layouts/users";

function App() {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/users/:userId?/:edit?" component={Users} />
        <Route path="/login/:type?" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
