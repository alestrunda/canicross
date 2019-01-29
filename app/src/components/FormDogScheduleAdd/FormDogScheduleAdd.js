import React from "react";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { normalizeInputTime } from "../../misc";
import { FormattedMessage, intlShape, injectIntl } from "react-intl";

class FormDogScheduleAdd extends React.Component {
  state = {
    from: "",
    to: ""
  };

  handleFromChange = e => {
    this.setState({
      from: e.target.value
    });
  };

  handleToChange = e => {
    this.setState({
      to: e.target.value
    });
  };

  handleSave = () => {
    const { from, to } = this.state;
    this.props.onSave({
      from: normalizeInputTime(from),
      to: normalizeInputTime(to)
    });
    this.setState({
      from: "",
      to: ""
    });
  };

  render() {
    return (
      <div className="grid grid--items-bottom">
        <div className="grid__item grid__item--md-span-4">
          <TextField
            style={{
              width: "100%"
            }}
            label={this.props.intl.formatMessage({
              id: "TimeFromWithFormat"
            })}
            value={this.state.from}
            onChange={this.handleFromChange}
            margin="normal"
          />
        </div>
        <div className="grid__item grid__item--md-span-4">
          <TextField
            style={{
              width: "100%"
            }}
            label={this.props.intl.formatMessage({
              id: "TimeToWithFormat"
            })}
            value={this.state.to}
            onChange={this.handleToChange}
            margin="normal"
          />
        </div>
        <div className="grid__item grid__item--md-span-4">
          <Button variant="contained" color="primary" onClick={this.handleSave}>
            <FormattedMessage id="Save" />
          </Button>
        </div>
      </div>
    );
  }
}

FormDogScheduleAdd.propTypes = {
  onSave: PropTypes.func.isRequired,
  intl: intlShape.isRequired
};

export default injectIntl(FormDogScheduleAdd);
