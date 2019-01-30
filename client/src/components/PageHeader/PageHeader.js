import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import FormLogIn from "../FormLogIn";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { setLanguage, userLogOut } from "../../actions";

class PageHeader extends React.Component {
  state = {
    isLoginOpened: false
  };

  getOtherLanguage(language) {
    return language === "en" ? "cs" : "en";
  }

  handleLanguageChange = () => {
    //switch to the other language
    this.props.onSetLanguage(this.getOtherLanguage(this.props.language));
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
                  <FormattedMessage id="Home" />
                </Link>
              </li>
              {!this.props.isUserLoggedIn && (
                <React.Fragment>
                  <li>
                    <Link className="nav-main__link" to="/register">
                      <FormattedMessage id="Registration" />
                    </Link>
                  </li>
                  <li>
                    <button
                      className="nav-main__link"
                      onClick={this.handleLogInClick}
                    >
                      <FormattedMessage id="LogIn" />
                    </button>
                  </li>
                </React.Fragment>
              )}
              {this.props.isUserLoggedIn && (
                <React.Fragment>
                  <li>
                    <Link className="nav-main__link" to="profile">
                      <FormattedMessage id="Profile" />
                    </Link>
                  </li>
                  <li>
                    <button
                      className="nav-main__link"
                      onClick={this.handleLogOutClick}
                    >
                      <FormattedMessage id="LogOut" />
                    </button>
                  </li>
                </React.Fragment>
              )}
            </ul>
            <button className="btn-langs" onClick={this.handleLanguageChange}>
              {this.getOtherLanguage(this.props.language)}
            </button>
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
  language: PropTypes.string,
  onUserLogOut: PropTypes.func.isRequired,
  onSetLanguage: PropTypes.func.isRequired,
  isUserLoggedIn: PropTypes.bool
};

const mapStateToProps = state => ({
  isUserLoggedIn: !!state.app.currentUserID,
  language: state.app.language
});

const mapDispatchToProps = dispatch => ({
  onSetLanguage: language => dispatch(setLanguage(language)),
  onUserLogOut: () => dispatch(userLogOut())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageHeader);
