/*global console*/

import React from "react";
import PropTypes from "prop-types";
import PageHeader from "../components/PageHeader";
import WalkingSheduleWalker from "../components/WalkingScheduleWalker";
import WalkingScheduleRegister from "../components/WalkingScheduleRegister";
import { FormattedMessage } from "react-intl";
import { walkingScheduleAdd, walkingScheduleRemove } from "../actions";
import { connect } from "react-redux";
import api from "../api";
import uuid from "uuid/v4";

class ProfileWalker extends React.Component {
  handleScheduleRegister = (dogID, date, timeFrom, timeTo) => {
    const newRecord = {
      id: uuid(),
      dogID,
      date: date.getTime(),
      timeFrom,
      timeTo,
      walkerID: this.props.currentUserID
    };
    this.props.onWalkingScheduleRegister(newRecord);
    api.createWalkingSchedule(newRecord).catch(e => {
      //log into some database with errors
      console.log(e); // eslint-disable-line no-console
    });
  };

  handleScheduleRecordRemove = recordID => {
    this.props.onWalkingScheduleRemove(recordID);
    api.removeWalkingScheduleRecord(recordID).catch(e => {
      //log into some database with errors
      console.log(e); // eslint-disable-line no-console
    });
  };

  render() {
    return (
      <React.Fragment>
        <PageHeader>Canicross</PageHeader>
        <div className="page-content">
          <div className="container">
            <div className="section-content">
              <h2 className="heading-mid">
                <FormattedMessage id="MySchedule" />
              </h2>
              <WalkingSheduleWalker
                currentUserID={this.props.currentUserID}
                dogs={this.props.dogs}
                schedule={this.props.schedule}
                users={this.props.users}
                onRemoveRecord={this.handleScheduleRecordRemove}
              />
            </div>
            <div className="section-content">
              <h2 className="heading-mid">
                <FormattedMessage id="NewRegistration" />
              </h2>
              <WalkingScheduleRegister
                dogs={this.props.dogs}
                users={this.props.users}
                onRegister={this.handleScheduleRegister}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

ProfileWalker.propTypes = {
  currentUserID: PropTypes.string,
  dogs: PropTypes.object,
  schedule: PropTypes.array,
  users: PropTypes.object,
  onWalkingScheduleRegister: PropTypes.func.isRequired,
  onWalkingScheduleRemove: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  currentUserID: state.app.currentUserID,
  dogs: state.dogs,
  schedule: state.walkingSchedule,
  users: state.users
});

const mapDispatchToProps = dispatch => ({
  onWalkingScheduleRegister: record => dispatch(walkingScheduleAdd(record)),
  onWalkingScheduleRemove: recordID => dispatch(walkingScheduleRemove(recordID))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileWalker);
