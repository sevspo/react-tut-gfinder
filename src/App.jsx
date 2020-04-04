import React, { useState, Fragment } from "react";
//If there is no default export, then you need the braces. here we also extract the Router etc from
//BrowserRouter. Else we would have to write: BrowserRouter.Router etc.
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/home";
import User from "./components/users/User";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import NotFound from "./components/pages/NotFound";
import axios from "axios";
import "./App.css";

import GithubState from "./context/github/GithubState";
import AlertState from "./context/alert/AlertState";

const App = () => {
  // declaring state: to use state, you always declare a pair: the state, and the change method.
  // const [user, setUser] = useState({});
  // but since we are using context now, we don't need this anymore

  return (
    <GithubState>
      <AlertState>
        <Router>
          <div className="App">
            <Navbar />
            <div className="container">
              <Alert />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route
                  exact
                  path="/user/:login"
                  // render={props => (
                  //   // if you need to pass routing information to a child, then we need to use render attribute.
                  //   // in this case we later need the login in the user component to fetch the users infos. We get login form the UserItem component.
                  //   <User {...props}/>
                  // )}
                  component={User}
                />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </AlertState>
    </GithubState>
  );
};

export default App;
