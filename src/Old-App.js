import React, { Component, Fragment } from 'react';
//If there is no default export, then you need the braces. here we also extract the Router etc from 
//BrowserRouter. Else we would have to write: BrowserRouter.Router etc.
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import User from "./components/users/User";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import axios from 'axios';
import './App.css';

class App extends Component {
  //declaring state
  state = {
    users: [],
    repos: [],
    user: {},
    loading: false,
    alert: null
  }

  // async componentDidMount() {
  //   this.setState({
  //     loading: true
  //   })

  //   const response = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

  //   this.setState({
  //     loading: false,
  //     users: response.data
  //   })
  // }

  //Search for a user
  searchUsers = async (text) => {
    this.setState({
      loading: true
    })

    const response = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({
      loading: false,
      users: response.data.items
    })
  }

  ///Get single Github User 
  getUser = async username => {
    this.setState({ loading: true });

    const res = await axios.get(
      `http://api.github.com/users/${username}?client_id=${
        //we pass in the secrets as defined in .env.local
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({ user: res.data, loading: false})
  }

  getUserRepos = async username => {
    this.setState({ loading: true });

    const res = await axios.get(
      `http://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({ repos: res.data, loading: false})
  }

  clearUsers = () => {
    this.setState({
      users: []
    })
  }

  setAlert = (message, type) => {
    this.setState({
      alert: {message, type}
    })
    setTimeout(() => this.setState({alert: null}), 2000)
  }

  render() {
    //Destructuring!
    const { users, user, repos, loading} = this.state; 

    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={this.state.alert} />
            <Switch>

              <Route exact path='/' render={props => (
                <Fragment>
                  <Search
                    searchUsers={this.searchUsers}
                    clearUsers={this.clearUsers}
                    showClear={users.length > 0 ? true : false}
                    setAlert={this.setAlert}
                  />
                  <Users loading={loading} users={users} />
                </Fragment>
              )}/>

              <Route exact path='/about' component={About} />
              
              <Route exact path='/user/:login' render={props => (
                // if you need to pass routing information to a child, then we need to use render attribute.
                // in this case we later need the login in the user component to fetch the users infos. We get login form the UserItem component.
                <User 
                  {...props} 
                  getUser={this.getUser} 
                  getUserRepos={this.getUserRepos} 
                  user={user} 
                  repos={repos}
                  loading={loading}
                />
              )} />

            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

export default App;
