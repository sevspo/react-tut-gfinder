import React, { Component } from 'react'

export class User extends Component {
    //this lifecycle event calls the get user function an posses in the name it gets form the render prop of the routing in App.
    componentDidMount() {
        this.props.getUser(this.props.match.params.login);
    }
    
    render() {
        const {
            name,
            avatar_url,
            location, 
            bio,
            blog,
            login,
            html_url,
            follower,
            following,
            public_gists,
            public_repos,
            hireable
        } = this.props.user;

        const { loading } = this.props;

        return (
            <div>
               {name} 
            </div>
        )
    }
}

export default User
