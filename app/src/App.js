import React, { Component } from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route } from "react-router-dom";
import routes from "./routes";
import { FormattedMessage } from "react-intl";
import { dogsLoad, usersLoad, walkingScheduleLoad } from "./actions";
import { connect } from "react-redux";
import { addLocaleData, IntlProvider } from "react-intl";
import api from "./api";
import en from "react-intl/locale-data/en";
import cs from "react-intl/locale-data/cs";
import "./scss/main.scss";

import localeCs from "./locale/cs.json";
import localeEn from "./locale/en.json";

const messages = {
  cs: localeCs,
  en: localeEn
};
addLocaleData([...en, ...cs]);

class App extends Component {
  state = {
    hasError: false
  };

  componentDidMount() {
    //load data from database
    api
      .getDogs()
      .then(({ data }) => this.props.onDogsLoad(data))
      .catch(e => console.log(e));
    api
      .getUsers()
      .then(({ data }) => this.props.onUsersLoad(data))
      .catch(e => console.log(e));
    api
      .getWalkingSchedule()
      .then(({ data }) => this.props.onWalkingScheduleLoad(data))
      .catch(e => console.log(e));
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.log(error, info);
  }

  render() {
    return (
      <IntlProvider
        locale={this.props.language}
        messages={messages[this.props.language]}
      >
        <Router>
          <div className="page-all">
            {this.state.hasError && (
              <div className="page-content">
                <p className="text-red">
                  <FormattedMessage id="App.criticalError" />
                </p>
              </div>
            )}
            {!this.state.hasError &&
              routes.map((item, index) => (
                <Route
                  key={index}
                  path={item.path}
                  exact
                  component={item.component}
                />
              ))}
            <footer className="page-footer">
              <div className="container">canicross 2018</div>
            </footer>
          </div>
        </Router>
      </IntlProvider>
    );
  }
}

App.propTypes = {
  onDogsLoad: PropTypes.func.isRequired,
  onUsersLoad: PropTypes.func.isRequired,
  onWalkingScheduleLoad: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  language: state.app.language
});

const mapDispatchToProps = dispatch => ({
  onDogsLoad: dogs => dispatch(dogsLoad(dogs)),
  onUsersLoad: users => dispatch(usersLoad(users)),
  onWalkingScheduleLoad: records => dispatch(walkingScheduleLoad(records))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
