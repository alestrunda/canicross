import React from "react";
import PropTypes from "prop-types";
import PageHeader from "../components/PageHeader";
import WalkingSchedule from "../components/WalkingSchedule";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";

class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        <PageHeader>Canicross</PageHeader>
        <div className="page-content">
          <div className="container">
            <div className="section-content text-center">
              <h2 className="mb15">
                <FormattedMessage id="Home.title" />
              </h2>
              {!this.props.isUserLoggedIn && (
                <p className="mb10">
                  <FormattedMessage id="Home.loginOrRegister" />
                </p>
              )}
              {this.props.isUserLoggedIn && (
                <p className="mb10">
                  <FormattedMessage id="Home.userProfileInfo" />
                </p>
              )}
            </div>
            <div className="section-content">
              <div className="grid grid--items-center">
                <div className="grid__item grid__item--lg-span-6">
                  <img
                    className="el-full mb30"
                    src={require("../front.jpg")}
                    alt=""
                  />
                </div>
                <div className="grid__item grid__item--lg-span-6">
                  <WalkingSchedule
                    dogs={this.props.dogs}
                    schedule={this.props.walkingSchedule}
                    users={this.props.users}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Home.propTypes = {
  dogs: PropTypes.object,
  walkingSchedule: PropTypes.array,
  users: PropTypes.object,
  isUserLoggedIn: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    isUserLoggedIn: !!state.app.currentUserID,
    dogs: state.dogs,
    users: state.users,
    walkingSchedule: state.walkingSchedule
  };
};

export default connect(mapStateToProps)(Home);
