import React, { Component } from 'react';
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import axios from 'axios';
import './App.css';


class App extends Component {
  state = {
    users: [],
    loading: false,
  }

  async componentDidMount() {
    this.setState({
      loading: true
    })


    const response = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    console.log(response.data)

    this.setState({
      loading: false,
      users: response.data
    })
  }

  render() {

    return (
      <div>
        <Navbar />
        <div className="container">
          <Users loading={this.state.loading} users={this.state.users} />
        </div>
      </div>
    )
  }
}

export default App;
