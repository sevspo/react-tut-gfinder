import React, { useState, Fragment } from "react";
//If there is no default export, then you need the braces. here we also extract the Router etc from
//BrowserRouter. Else we would have to write: BrowserRouter.Router etc.
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import User from "./components/users/User";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import axios from "axios";
import "./App.css";

const App = () => {
  //declaring state
  const [users, setUsers] = useState([]);
  const [repos, setRepos] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  //Search for a user
  const searchUsers = async text => {
    setLoading(true);

    const response = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    setUsers(response.data.items);
    setLoading(false);
  };

  ///Get single Github User
  const getUser = async username => {
    setLoading(true);

    const res = await axios.get(
      `http://api.github.com/users/${username}?client_id=${
        //we pass in the secrets as defined in .env.local
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    setUser(res.data);
    setLoading(false);
  };

  const getUserRepos = async username => {
    setLoading(true);

    const res = await axios.get(
      `http://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    setRepos(res.data);
    setLoading(false);
  };

  const clearUsers = () => {
    setUsers([]);
  };

  const showAlert = (message, type) => {
    // be careful here: you have to use curly braces in here.
    // But is that destructing or "consructing" an object? ==> it is the later
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 4000);
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Alert alert={alert} />
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <Fragment>
                  <Search
                    searchUsers={searchUsers}
                    clearUsers={clearUsers}
                    showClear={users.length > 0 ? true : false}
                    showAlert={showAlert}
                  />
                  <Users loading={loading} users={users} />
                </Fragment>
              )}
            />

            <Route exact path="/about" component={About} />

            <Route
              exact
              path="/user/:login"
              render={props => (
                // if you need to pass routing information to a child, then we need to use render attribute.
                // in this case we later need the login in the user component to fetch the users infos. We get login form the UserItem component.
                <User
                  {...props}
                  getUser={getUser}
                  getUserRepos={getUserRepos}
                  user={user}
                  repos={repos}
                  loading={loading}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
