import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import FormLogIn from "../FormLogIn";
import { connect } from "react-redux";
import { userLogOut } from "../../actions";

class PageHeader extends React.Component {
  state = {
    isLoginOpened: false
  };

  handleLogInClose = () => {
    this.setState({
      isLoginOpened: false
    });
  };

  handleLogInClick = () => {
    this.setState({
      isLoginOpened: !this.state.isLoginOpened
    });
  };

  handleLogOutClick = () => {
    this.props.onUserLogOut();
  };

  render() {
    return (
      <header className="page-header">
        <div className="container page-header__inner">
          <h1>{this.props.children}</h1>
          <nav className="page-header__nav">
            <ul className="nav-main">
              <li>
                <Link className="nav-main__link" to="/">
                  Domů
                </Link>
              </li>
              {!this.props.isUserLoggedIn && (
                <React.Fragment>
                  <li>
                    <Link className="nav-main__link" to="/register">
                      Registrace
                    </Link>
                  </li>
                  <li>
                    <button
                      className="nav-main__link"
                      onClick={this.handleLogInClick}
                    >
                      Přihlášení
                    </button>
                  </li>
                </React.Fragment>
              )}
              {this.props.isUserLoggedIn && (
                <React.Fragment>
                  <li>
                    <Link className="nav-main__link" to="profile">
                      Profil
                    </Link>
                  </li>
                  <li>
                    <button
                      className="nav-main__link"
                      onClick={this.handleLogOutClick}
                    >
                      Odhlášení
                    </button>
                  </li>
                </React.Fragment>
              )}
            </ul>
          </nav>
          <FormLogIn
            active={this.state.isLoginOpened}
            onClose={this.handleLogInClose}
          />
        </div>
      </header>
    );
  }
}

PageHeader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  onUserLogOut: PropTypes.func.isRequired,
  isUserLoggedIn: PropTypes.bool
};

const mapStateToProps = state => ({
  isUserLoggedIn: !!state.app.currentUserID
});

const mapDispatchToProps = dispatch => ({
  onUserLogOut: () => dispatch(userLogOut())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageHeader);
