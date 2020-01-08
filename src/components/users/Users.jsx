import React, { Component } from 'react'
import UserItem from "./UserItem"

export class Users extends Component {
    state = {
        users: [
            {
                id: '1',
                login: 'mojombo',
                avatar_url: 'https://avatars0.githubusercontent.com/u/1?v=4',
                html_url: "https://github.com/mojombo" 
            },
            {
                id: '1',
                login: 'defunkt',
                avatar_url: 'https://avatars0.githubusercontent.com/u/2?v=4',
                html_url: "https://github.com/defunkt" 
            },
            {
                id: '1',
                login: 'pjhyett',
                avatar_url: 'https://avatars0.githubusercontent.com/u/3?v=4',
                html_url: "https://github.com/pjhyett" 
            }
        ]
    }

    render() {
        return (
            <div style={itemStyle}>
                {this.state.users.map(user => (
                    <UserItem key={user.id} user={user} />
                ))}
            </div>
        )
    }
}

const itemStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1em'
}

export default Users
