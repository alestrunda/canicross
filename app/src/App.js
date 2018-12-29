import React, { Component } from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route } from "react-router-dom";
import routes from "./routes";
import { dogsLoad, usersLoad, walkingScheduleLoad } from "./actions";
import { connect } from "react-redux";
import api from "./api";
import "./scss/main.scss";

class App extends Component {
  state = {
    hasError: false
  };

  componentDidMount() {
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
      <Router>
        <div className="page-all">
          {this.state.hasError && (
            <div className="page-content">
              <p className="text-red">
                Nastala kritická chyba, podrobnosti v konzoli
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
    );
  }
}

App.propTypes = {
  onDogsLoad: PropTypes.func.isRequired,
  onUsersLoad: PropTypes.func.isRequired,
  onWalkingScheduleLoad: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  onDogsLoad: dogs => dispatch(dogsLoad(dogs)),
  onUsersLoad: users => dispatch(usersLoad(users)),
  onWalkingScheduleLoad: records => dispatch(walkingScheduleLoad(records))
});

export default connect(
  null,
  mapDispatchToProps
)(App);
