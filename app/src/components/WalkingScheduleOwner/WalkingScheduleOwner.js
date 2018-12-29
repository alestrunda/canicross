import React from "react";
import PropTypes from "prop-types";
import { formatRecordTime } from "../../misc";

const WalkingScheduleOwner = ({ allDogs, ownerDogIDs, schedule, users }) => {
  const records = schedule.filter(record => ownerDogIDs.includes(record.dogID));
  if (!records.length) return <p>Žádná data</p>;
  return (
    <table className="table-simple">
      <thead>
        <tr>
          <th>Pes</th>
          <th>Běžec</th>
          <th>Datum</th>
          <th>Čas</th>
        </tr>
      </thead>
      <tbody>
        {records.map(record => {
          const date = new Date(record.date);
          return (
            <tr key={record.id}>
              <td>{allDogs[record.dogID].name}</td>
              <td>{users[record.walkerID].name}</td>
              <td>{`${date.getDate()}. ${date.getMonth()}.`}</td>
              <td>{formatRecordTime(record.timeFrom, record.timeTo)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

WalkingScheduleOwner.propTypes = {
  allDogs: PropTypes.object,
  ownerDogIDs: PropTypes.array,
  schedule: PropTypes.array,
  users: PropTypes.object
};

export default WalkingScheduleOwner;
