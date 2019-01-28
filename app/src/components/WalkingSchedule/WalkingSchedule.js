import React from "react";
import PropTypes from "prop-types";
import { dateToStr, formatRecordTime } from "../../misc";

const WalkingSchedule = ({ dogs, schedule, users }) => {
  const usersArray = Object.values(users);
  if (!schedule.length) return <p className="text-center">Žádná data</p>;
  return (
    <table className="table-simple">
      <thead>
        <tr>
          <th>Běžec</th>
          <th>Pes</th>
          <th>Majitel</th>
          <th>Datum</th>
          <th>Čas</th>
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
