import React from "react";
import PropTypes from "prop-types";
import PageHeader from "../components/PageHeader";
import { Redirect } from "react-router-dom";
import FormEditDog from "../components/FormEditDog";
import {
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField
} from "@material-ui/core";
import { dogAdd, userRegister } from "../actions";
import { connect } from "react-redux";
import api from "../api";
import uuid from "uuid/v4";
import { USER_TYPE } from "../settings";

class Registration extends React.Component {
  formDogRefs = [];

  state = {
    name: "",
    email: "",
    password: "",
    error: "",
    dogs: [],
    userType: USER_TYPE.WALKER
  };

  handleEmailChange = e => {
    this.setState({
      email: e.target.value
    });
  };

  handleNameChange = e => {
    this.setState({
      name: e.target.value
    });
  };

  handlePasswordChange = e => {
    this.setState({
      password: e.target.value
    });
  };

  handleUserTypeChange = e => {
    this.setState({
      userType: parseInt(e.target.value)
    });
  };

  handleFormCancel = () => {
    this.redirectTo("/");
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const { name, email, password, userType } = this.state;
    if (!name || !email || !password) {
      this.setState({
        error: "Vyplňte všechna pole"
      });
      return;
    }
    const userID = uuid();
    const dogs = this.state.dogs.map(dog => ({
      id: dog.id,
      ...this.formDogRefs[dog.id].current.state //fill all the dog properties from the corresponding form
    }));

    //create user
    const newUser = {
      id: userID,
      name,
      email,
      password,
      userType,
      dogIDs: [] //init only with empty array, will be filled with onAddDog
    };

    this.props.onUserRegister(newUser);
    api.createUser(newUser).catch(e => {
      console.log(e);
    });

    //add user's dogs
    //dog is linked to it's owner, so make sure to add dog after user registration
    dogs.forEach(dog => {
      this.props.onAddDog(userID, dog);
      api.createDog(dog).catch(e => {
        console.log(e);
      });
    });

    this.redirectTo("/");
  };

  handleDogAdd = () => {
    //add empty dog structure, just init id
    this.setState({
      dogs: [...this.state.dogs, { id: uuid() }]
    });
  };

  redirectTo(target) {
    this.setState({
      redirect: target
    });
  }

  handleRemoveDog = dogID => {
    this.setState({
      dogs: this.state.dogs.filter(dog => dog.id !== dogID)
    });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.redirect && <Redirect to={this.state.redirect} />}
        <PageHeader>Registrace</PageHeader>
        <div className="page-content">
          <div className="container">
            <h2 className="mt40">Vyplňte registrační údaje</h2>
            <form onSubmit={this.handleFormSubmit}>
              <div className="section-content">
                <div className="grid">
                  <div className="grid__item grid__item--md-span-4">
                    <TextField
                      style={{
                        width: "100%"
                      }}
                      label="Přezdívka"
                      value={this.state.name}
                      onChange={this.handleNameChange}
                      margin="normal"
                    />
                  </div>
                  <div className="grid__item grid__item--md-span-4">
                    <TextField
                      style={{
                        width: "100%"
                      }}
                      label="Emailová adresa"
                      value={this.state.email}
                      onChange={this.handleEmailChange}
                      margin="normal"
                    />
                  </div>
                  <div className="grid__item grid__item--md-span-4">
                    <TextField
                      style={{
                        width: "100%"
                      }}
                      label="Heslo"
                      type="password"
                      value={this.state.password}
                      onChange={this.handlePasswordChange}
                      margin="normal"
                    />
                  </div>
                </div>
              </div>
              <div className="section-content">
                <h3 className="mb15">Typ účtu</h3>
                <RadioGroup
                  name="user-type"
                  value={this.state.userType.toString()}
                  onChange={this.handleUserTypeChange}
                >
                  <FormControlLabel
                    value={USER_TYPE.WALKER.toString()}
                    control={<Radio />}
                    label="Běžec"
                  />
                  <FormControlLabel
                    value={USER_TYPE.OWNER.toString()}
                    control={<Radio />}
                    label="Majitel psa"
                  />
                </RadioGroup>
                {this.state.userType === USER_TYPE.OWNER && (
                  <React.Fragment>
                    {this.state.dogs.map(dog => {
                      this.formDogRefs[dog.id] = React.createRef();
                      return (
                        <FormEditDog
                          ref={this.formDogRefs[dog.id]}
                          key={dog.id}
                          dog={dog}
                          onRemove={this.handleRemoveDog}
                        />
                      );
                    })}
                    <Button
                      style={{ marginTop: 10 }}
                      onClick={this.handleDogAdd}
                      variant="contained"
                      color="primary"
                    >
                      Přidat psa
                    </Button>
                  </React.Fragment>
                )}
              </div>
              <div className="section-content">
                {this.state.error && <p className="mb10">{this.state.error}</p>}
                <div className="grid">
                  <div className="grid__item grid__item--md-span-6">
                    <Button
                      onClick={this.handleFormCancel}
                      variant="contained"
                      color="secondary"
                    >
                      Zrušit
                    </Button>
                  </div>
                  <div className="grid__item grid__item--md-span-6 text-right">
                    <Button
                      onClick={this.handleFormSubmit}
                      variant="contained"
                      color="primary"
                    >
                      Registrovat
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Registration.propTypes = {
  onAddDog: PropTypes.func.isRequired,
  onUserRegister: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  onAddDog: (userID, dog) => dispatch(dogAdd(userID, dog)),
  onUserRegister: user => dispatch(userRegister(user))
});

export default connect(
  null,
  mapDispatchToProps
)(Registration);
