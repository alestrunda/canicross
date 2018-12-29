import React from "react";
import PropTypes from "prop-types";
import DialogScheduleRegister from "../DialogScheduleRegister";
import { Button } from "@material-ui/core";
import { formatRecordTime, getOwnerByDogID } from "../../misc";

class WalkingScheduleRegister extends React.Component {
  state = {
    isDialogOpened: false,
    selectedDog: null
  };

  openDialog = dog => {
    this.setState({
      selectedDog: dog,
      isDialogOpened: true
    });
  };

  closeDialog = () => {
    this.setState({
      isDialogOpened: false
    });
  };

  handleRegister = (date, from, to) => {
    this.props.onRegister(this.state.selectedDog.id, date, from, to);
    this.closeDialog();
  };

  render() {
    const dogsArray = Object.values(this.props.dogs);
    const dogsWithSchedule = dogsArray.filter(dog => dog.schedule.length);
    if (!dogsWithSchedule.length) return <p>Žádné volné položky</p>;
    return (
      <React.Fragment>
        <table className="table-simple">
          <thead>
            <tr>
              <th>Majitel</th>
              <th>Pes</th>
              <th>K dispozici od - do</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {dogsWithSchedule.map(dog => {
              const owner = getOwnerByDogID(dog.id, this.props.users);
              return (
              <tr key={dog.id}>
                <td>{owner.name}</td>
                <td>{dog.name}</td>
                <td>
                  {dog.schedule.map((record, index) => (
                    <div key={index}>
                      {formatRecordTime(record.from, record.to)}
                    </div>
                  ))}
                </td>
                <td>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => this.openDialog(dog)}
                  >
                    Registrovat se
                  </Button>
                </td>
              </tr>
            )})}
          </tbody>
        </table>
        {this.state.selectedDog && (
          <DialogScheduleRegister
            open={this.state.isDialogOpened}
            onClose={this.closeDialog}
            onRegister={this.handleRegister}
            dogSchedule={this.state.selectedDog.schedule}
          />
        )}
      </React.Fragment>
    );
  }
}

WalkingScheduleRegister.propTypes = {
  dogs: PropTypes.object,
  users: PropTypes.object,
  onRegister: PropTypes.func.isRequired
};

export default WalkingScheduleRegister;
