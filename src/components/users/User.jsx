import React, { Fragment, useEffect, useContext } from "react";
import Spinner from "../layout/Spinner";
//import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Repos from "../repos/Repos";
import GithubContext from "../../context/github/githubContext";


const User = ({  match }) => {
  //this lifecycle event calls the get user function an posses in the name it gets form the render prop of the routing in App.
  useEffect(() => {
    /// funny that this still works, since we do not pass anything in anymore
    getUser(match.params.login);
    getUserRepos(match.params.login);
    // eslint-disable-next-line
  }, []);

  const githubContext = useContext(GithubContext);
  /// here some destructing
  const { user, getUser, loading, getUserRepos, repos, } = githubContext;

  const {
    name,
    avatar_url,
    location,
    bio,
    blog,
    login,
    company,
    html_url,
    followers,
    following,
    public_gists,
    public_repos,
    hireable
  } = user;

  if (loading) return <Spinner />;

  return (
    <Fragment>
      <Link to="/" className="btn btn-light">
        Back to Search
      </Link>
      Hireable:{" "}
      {hireable ? (
        <i className="fas fa-check text-success" />
      ) : (
        <i className="fas fa-times-circle text-danger" />
      )}
      <div className="card gird-2">
        <div className="all-center">
          <img
            src={avatar_url}
            alt={name}
            style={{ width: "150px" }}
            className="round-img"
          />
          <h1>{name}</h1>
          <p>{location}</p>
        </div>
        <div>
          {bio && (
            <Fragment>
              <h3>Bio</h3>
              <p>{bio}</p>
            </Fragment>
          )}
          <a href={html_url} className="btn btn-dark my-1">
            Visit Profile
          </a>
          <ul>
            <li>
              {login && (
                <Fragment>
                  <strong>Username: </strong> {login}
                </Fragment>
              )}
            </li>
            <li>
              {company && (
                <Fragment>
                  <strong>Company: </strong> {company}
                </Fragment>
              )}
            </li>
            <li>
              {blog && (
                <Fragment>
                  <strong>Website: </strong> {blog}
                </Fragment>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className="card text-center">
        <div className="badge badge-primary">Followers: {followers}</div>
        <div className="badge badge-success">Following: {following}</div>
        <div className="badge badge-light">Public Repos: {public_repos}</div>
        <div className="badge badge-dark">Public Gists: {public_gists}</div>
      </div>
      <Repos repos={repos} />
    </Fragment>
  );
};

// User.propTypes = {
//   loading: PropTypes.bool,
//   user: PropTypes.object.isRequired,
//   getUser: PropTypes.func.isRequired,
//   repos: PropTypes.array.isRequired,
//   getUserRepos: PropTypes.func.isRequired
// };

export default User;
