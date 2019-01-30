import React from "react";
import PropTypes from "prop-types";
import { Button, TextField } from "@material-ui/core";
import classNames from "classnames";
import { FormattedMessage, intlShape, injectIntl } from "react-intl";
import { userLogIn } from "../../actions";
import { connect } from "react-redux";
import api from "../../api";

class FormLogIn extends React.Component {
  state = {
    name: "",
    password: "",
    error: ""
  };

  componentDidUpdate(prevProps) {
    //clear error message when the form is reopened
    if (!prevProps.active && this.props.active) {
      this.setState({
        error: ""
      });
    }
  }

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

  resetState() {
    this.setState({
      name: "",
      password: "",
      error: ""
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { name, password } = this.state;
    if (!name || !password) {
      this.setState({
        error: this.props.intl.formatMessage({
          id: "FillAllFields"
        })
      });
      return;
    }
    api
      .userLogIn(name, password)
      .then(({ data }) => {
        this.resetState();
        this.props.onUserLogIn(data.id);
        this.props.onClose();
      })
      .catch(() => {
        this.setState({
          error: this.props.intl.formatMessage({
            id: "WrongUsernameOrPassword"
          })
        });
      });
  };

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        className={classNames("page-header__login", {
          active: this.props.active
        })}
      >
        <TextField
          style={{
            width: "100%"
          }}
          label={this.props.intl.formatMessage({
            id: "Username"
          })}
          value={this.state.name}
          onChange={this.handleNameChange}
          margin="normal"
        />
        <TextField
          style={{
            width: "100%"
          }}
          label={this.props.intl.formatMessage({
            id: "Password"
          })}
          type="password"
          value={this.state.password}
          onChange={this.handlePasswordChange}
          margin="normal"
        />
        {this.state.error && (
          <p className="text-red mt10 mb10">{this.state.error}</p>
        )}
        <div className="text-center mt25">
          <Button
            onClick={this.handleSubmit}
            variant="contained"
            color="primary"
          >
            <FormattedMessage id="LogIn" />
          </Button>
        </div>
      </form>
    );
  }
}

FormLogIn.propTypes = {
  active: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onUserLogIn: PropTypes.func.isRequired,
  intl: intlShape.isRequired
};

const mapDispatchToProps = dispatch => ({
  onUserLogIn: userID => dispatch(userLogIn(userID))
});

const mapStateToProps = state => ({
  users: state.users
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(FormLogIn));
