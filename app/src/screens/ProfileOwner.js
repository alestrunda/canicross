import React from "react";
import PropTypes from "prop-types";
import PageHeader from "../components/PageHeader";
import FormEditDog from "../components/FormEditDog";
import FormDogSchedule from "../components/FormDogSchedule";
import FormDogScheduleAdd from "../components/FormDogScheduleAdd";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import classNames from "classnames";
import WalkingScheduleOwner from "../components/WalkingScheduleOwner";
import {
  dogAdd,
  dogEdit,
  dogRemove,
  dogScheduleAdd,
  dogScheduleRemove
} from "../actions";
import uuid from "uuid/v4";
import api from "../api";

class ProfileOwner extends React.Component {
  formDogRefs = [];

  state = {
    selectedDogID: null,
    isFormAddTimeOpened: false
  };

  handleAddDog = () => {
    //create empty dog structure, just init id
    const dog = {
      id: uuid()
    };
    this.props.onAddDog(this.props.currentUser.id, dog);
    api.createDog(dog).catch(e => {
      console.log(e);
    });
    this.addDogToUser(this.props.currentUser.id, dog.id);
  };

  addDogToUser(userID, dogID) {
    const targetUser = this.props.users[userID];
    targetUser.dogIDs.push(dogID);
    api.editUser(targetUser).catch(e => {
      console.log(e);
    });
  }

  openFormScheduleAdd = dogID => {
    this.setState({
      isFormAddTimeOpened: true,
      selectedDogID: dogID
    });
  };

  handleRemoveDog = dogID => {
    this.props.onRemoveDog(dogID, this.props.currentUser.id);

    //remove dog
    //api.removeDog(dogID, this.props.currentUser.id);

    //remove walking records concerning the dog
    api.removeWalkingScheduleByDog(dogID);

    //remove dog from the owner
    const owner = this.props.currentUser;
    owner.dogIDs = owner.dogIDs.filter(dog => dog !== dogID);
    //api.editUser(owner);
  };

  handleEditDog = dog => {
    //schedule is not part of the form, so it needs to be add afterwards
    const dogToEdit = {
      ...dog,
      schedule: this.props.dogs[dog.id].schedule
    }
    this.props.onEditDog(dogToEdit);
    api.editDog(dogToEdit).catch(e => {
      console.log(e);
    });
  };

  handleScheduleRecordRemove = (dogID, record) => {
    this.props.onDogScheduleRemove(dogID, record);
    const dog = this.props.dogs[dogID];
    dog.schedule = dog.schedule.filter(
      item => !(item.from === record.from && item.to === record.to)
    );
    api.editDog(dog).catch(e => {
      console.log(e);
    });
  };

  handleScheduleAdd = record => {
    this.props.onDogScheduleAdd(this.state.selectedDogID, record);
    const dog = this.props.dogs[this.state.selectedDogID];
    dog.schedule.push(record);
    api.editDog(dog).catch(e => {
      console.log(e);
    });
    this.setState({
      selectedDogID: null,
      isFormAddTimeOpened: false
    });
  };

  render() {
    const { currentUser } = this.props;

    return (
      <React.Fragment>
        <PageHeader>Canicross</PageHeader>
        <div className="page-content">
          <div className="section-content container">
            <h2 className="heading-mid">Můj rozvrh</h2>
            <WalkingScheduleOwner
              allDogs={this.props.dogs}
              ownerDogIDs={currentUser.dogIDs}
              schedule={this.props.schedule}
              users={this.props.users}
            />
          </div>
          <div className="section-content">
            <div className="container">
              <h2 className="heading-mid">Moji psi</h2>
              {currentUser.dogIDs.length === 0 && (
                <p className="mt10 mb10">Žádná data</p>
              )}
            </div>
            {currentUser.dogIDs.map((dogID, index) => {
              const dog = this.props.dogs[dogID];
              this.formDogRefs[dogID] = React.createRef();
              return (
                <div
                  className={classNames("section-content border-bottom-gray", {
                    "bg-gray": index % 2 === 0
                  })}
                  key={dogID}
                >
                  <div className="container">
                    <h3>{dog.name || "Jméno psa"}</h3>
                    <FormEditDog
                      editable
                      dog={dog}
                      ref={this.formDogRefs[dogID]}
                      onEdit={this.handleEditDog}
                      onRemove={this.handleRemoveDog}
                    />
                    <FormDogSchedule
                      onRemove={this.handleScheduleRecordRemove}
                      dog={dog}
                    />
                    <Button
                      style={{ marginTop: 25 }}
                      variant="contained"
                      onClick={() => this.openFormScheduleAdd(dogID)}
                    >
                      Přidat čas
                    </Button>
                    {this.state.isFormAddTimeOpened &&
                      this.state.selectedDogID === dogID && (
                        <FormDogScheduleAdd onSave={this.handleScheduleAdd} />
                      )}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="container section-content">
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleAddDog}
            >
              Přidat psa
            </Button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

ProfileOwner.propTypes = {
  currentUser: PropTypes.object,
  schedule: PropTypes.array,
  dogs: PropTypes.object,
  users: PropTypes.object,
  onEditDog: PropTypes.func.isRequired,
  onAddDog: PropTypes.func.isRequired,
  onDogScheduleAdd: PropTypes.func.isRequired,
  onRemoveDog: PropTypes.func.isRequired,
  onDogScheduleRemove: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  onAddDog: (userID, dog) => dispatch(dogAdd(userID, dog)),
  onEditDog: dog => dispatch(dogEdit(dog)),
  onRemoveDog: (dogID, userID) => dispatch(dogRemove(dogID, userID)),
  onDogScheduleRemove: (dogID, record) =>
    dispatch(dogScheduleRemove(dogID, record)),
  onDogScheduleAdd: (dogID, record) => dispatch(dogScheduleAdd(dogID, record))
});

const mapStateToProps = state => {
  const currentUser = state.users[state.app.currentUserID];

  return {
    currentUser,
    dogs: state.dogs,
    schedule: state.walkingSchedule,
    users: state.users
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileOwner);
