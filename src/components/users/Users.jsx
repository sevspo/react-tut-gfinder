import React from "react";
import UserItem from "./UserItem";
import Spinner from "../layout/Spinner";
import PropTypes from "prop-types";
import GithubContext from "../../context/github/githubContext";
import { useContext } from "react";

const Users = () => {
  const githubContext = useContext(GithubContext);

  const { loading, users } = githubContext;

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div style={itemStyle}>
        {users.map(user => (
          <UserItem key={user.id} user={user}/>
        ))}
      </div>
    );
  }
};

const itemStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "1em"
};

/// We don't need this anymore, since we are not using props anymore
// Users.propTypes = {
//   loading: PropTypes.bool.isRequired,
//   users: PropTypes.array.isRequired
// };

export default Users;
