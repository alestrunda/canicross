import React from "react";
import PropTypes from "prop-types";
import { formatRecordTime, getOwnerByDogID } from "../../misc";
import { Button } from "@material-ui/core";

const WalkingScheduleWalker = ({
  currentUserID,
  dogs,
  schedule,
  users,
  onRemoveRecord
}) => {
  const records = schedule.filter(record => record.walkerID === currentUserID);
  if (!records.length) return <p>Žádná data</p>;

  return (
    <table className="table-simple">
      <thead>
        <tr>
          <th>Majitel</th>
          <th>Pes</th>
          <th>Datum</th>
          <th>Čas</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {records.map(record => {
          const date = new Date(record.date);
          const dog = dogs[record.dogID];
          const owner = getOwnerByDogID(record.dogID, users);
          return (
            <tr key={record.id}>
              <td>{owner.name}</td>
              <td>{dog.name}</td>
              <td>{`${date.getDate()}. ${date.getMonth()}.`}</td>
              <td>{formatRecordTime(record.timeFrom, record.timeTo)}</td>
              <td>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => onRemoveRecord(record.id)}
                >
                  Zrušit
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

WalkingScheduleWalker.propTypes = {
  currentUserID: PropTypes.string,
  dogs: PropTypes.object,
  schedule: PropTypes.array,
  users: PropTypes.object,
  onRemoveRecord: PropTypes.func.isRequired
};

export default WalkingScheduleWalker;
