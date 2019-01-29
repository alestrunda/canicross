/*global console*/

import React from "react";
import PropTypes from "prop-types";
import PageHeader from "../components/PageHeader";
import { Redirect } from "react-router-dom";
import FormEditDog from "../components/FormEditDog";
import { FormattedMessage, intlShape, injectIntl } from "react-intl";
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
        error: this.props.intl.formatMessage({ id: "FillAllFields" })
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
      dogIDs: []
    };

    //add user's dogs
    dogs.forEach(dog => {
      this.props.onAddDog(dog);
      api.createDog(dog).catch(e => {
        //log into some database with errors
        console.log(e); // eslint-disable-line no-console
      });
      newUser.dogIDs.push(dog.id);
    });

    this.props.onUserRegister(newUser);
    api.createUser(newUser).catch(e => {
      //log into some database with errors
      console.log(e); // eslint-disable-line no-console
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
        <PageHeader>
          <FormattedMessage id="Registration" />
        </PageHeader>
        <div className="page-content">
          <div className="container">
            <h2 className="mt40">
              <FormattedMessage id="Registration.fillFields" />
            </h2>
            <form onSubmit={this.handleFormSubmit}>
              <div className="section-content">
                <div className="grid">
                  <div className="grid__item grid__item--md-span-4">
                    <TextField
                      style={{
                        width: "100%"
                      }}
                      label={this.props.intl.formatMessage({ id: "Username" })}
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
                      label={this.props.intl.formatMessage({
                        id: "EmailAddress"
                      })}
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
                      label={this.props.intl.formatMessage({ id: "Password" })}
                      type="password"
                      value={this.state.password}
                      onChange={this.handlePasswordChange}
                      margin="normal"
                    />
                  </div>
                </div>
              </div>
              <div className="section-content">
                <h3 className="mb15">
                  <FormattedMessage id="AccountType" />
                </h3>
                <RadioGroup
                  name="user-type"
                  value={this.state.userType.toString()}
                  onChange={this.handleUserTypeChange}
                >
                  <FormControlLabel
                    value={USER_TYPE.WALKER.toString()}
                    control={<Radio />}
                    label={this.props.intl.formatMessage({ id: "Walker" })}
                  />
                  <FormControlLabel
                    value={USER_TYPE.OWNER.toString()}
                    control={<Radio />}
                    label={this.props.intl.formatMessage({ id: "DogOwner" })}
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
                      <FormattedMessage id="AddDog" />
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
                      <FormattedMessage id="Cancel" />
                    </Button>
                  </div>
                  <div className="grid__item grid__item--md-span-6 text-right">
                    <Button
                      onClick={this.handleFormSubmit}
                      variant="contained"
                      color="primary"
                    >
                      <FormattedMessage id="Register" />
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
  onUserRegister: PropTypes.func.isRequired,
  intl: intlShape.isRequired
};

const mapDispatchToProps = dispatch => ({
  onAddDog: dog => dispatch(dogAdd(dog)),
  onUserRegister: user => dispatch(userRegister(user))
});

export default connect(
  null,
  mapDispatchToProps
)(injectIntl(Registration));
