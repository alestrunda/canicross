import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import { dateToStr, formatRecordTime } from "../../misc";

const WalkingSchedule = ({ dogs, schedule, users }) => {
  const usersArray = Object.values(users);
  if (!schedule.length)
    return (
      <p className="text-center">
        <FormattedMessage id="NoData" />
      </p>
    );
  return (
    <table className="table-simple">
      <thead>
        <tr>
          <th>
            <FormattedMessage id="Walker" />
          </th>
          <th>
            <FormattedMessage id="Dog" />
          </th>
          <th>
            <FormattedMessage id="DogOwner" />
          </th>
          <th>
            <FormattedMessage id="Date" />
          </th>
          <th>
            <FormattedMessage id="Time" />
          </th>
        </tr>
      </thead>
      <tbody>
        {schedule.map(record => {
          const date = new Date(record.date);
          const owner = usersArray.find(user =>
            user.dogIDs.includes(record.dogID)
          );
          return (
            <tr key={record.id}>
              <td>{users[record.walkerID].name}</td>
              <td>{dogs[record.dogID].name}</td>
              <td>{owner.name}</td>
              <td>{dateToStr(date)}</td>
              <td>{formatRecordTime(record.timeFrom, record.timeTo)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

WalkingSchedule.propTypes = {
  dogs: PropTypes.object,
  schedule: PropTypes.array,
  users: PropTypes.object
};

export default WalkingSchedule;
