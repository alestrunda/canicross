import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage, intlShape, injectIntl } from "react-intl";
import { Button, Dialog, TextField } from "@material-ui/core";
import { dateToStr, isDateStr, normalizeInputTime } from "../../misc";

class DialogScheduleRegister extends React.Component {
  state = {
    date: new Date(),
    from: "",
    to: "",
    error: ""
  };

  handleDateChange = e => {
    const date = new Date(e.target.value);
    if (!isDateStr(e.target.value) || !date || !date.getTime()) {
      this.setState({
        date: e.target.value,
        error: this.props.intl.formatMessage({ id: "WrongDateFormat" })
      });
    } else {
      this.setState({
        date,
        error: ""
      });
    }
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

  handleSubmit = () => {
    const from = normalizeInputTime(this.state.from),
      to = normalizeInputTime(this.state.to);
    const matchingScheduleRecord = this.props.dogSchedule.find(
      record => from >= record.from && to <= record.to
    );
    if (!matchingScheduleRecord) {
      this.setState({
        error: this.props.intl.formatMessage({ id: "RangeNotCorrect" })
      });
      return;
    }
    this.props.onRegister(this.state.date, from, to);
    this.resetState();
  };

  resetState() {
    this.setState({
      date: new Date(),
      from: "",
      to: "",
      error: ""
    });
  }

  render() {
    const dateStr =
      typeof this.state.date === "object"
        ? dateToStr(this.state.date)
        : this.state.date;
    return (
      <Dialog open={this.props.open} onClose={this.props.onClose}>
        <div className="container section-content">
          <h3 className="heading-mid">
            <FormattedMessage id="InsertTime" />
          </h3>
          <TextField
            style={{
              width: "100%",
              marginBottom: 20
            }}
            label={this.props.intl.formatMessage({ id: "DateWithFormat" })}
            value={dateStr}
            onChange={this.handleDateChange}
            margin="normal"
          />
          <div className="grid">
            <div className="grid__item grid__item--md-span-6">
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
            <div className="grid__item grid__item--md-span-6">
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
          </div>
          {this.state.error && (
            <p className="text-red mt15">{this.state.error}</p>
          )}
          <div className="text-center mt20 mb10">
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleSubmit}
            >
              <FormattedMessage id="Confirm" />
            </Button>
          </div>
        </div>
      </Dialog>
    );
  }
}

DialogScheduleRegister.propTypes = {
  dogSchedule: PropTypes.array,
  onRegister: PropTypes.func.isRequired,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  intl: intlShape.isRequired
};

export default injectIntl(DialogScheduleRegister);
