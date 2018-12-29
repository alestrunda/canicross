import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import { formatRecordTime } from "../../misc";

const FormDogSchedule = props => {
  return (
    <div>
      {props.dog.schedule.map((record, index) => (
        <Button
          key={index}
          style={{ marginRight: 20 }}
          onClick={() => props.onRemove(props.dog.id, record)}
          variant="contained"
          color="default"
        >
          {formatRecordTime(record.from, record.to)}
          <DeleteIcon style={{ marginLeft: 10 }} />
        </Button>
      ))}
    </div>
  );
};

FormDogSchedule.propTypes = {
  dog: PropTypes.object,
  onRemove: PropTypes.func.isRequired
};

export default FormDogSchedule;
