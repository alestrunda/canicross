import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from "@material-ui/core";
import { DOG_BREEDS } from "../../settings";

class FormEditDog extends React.Component {
  state = {
    name: "",
    age: "",
    breed: ""
  };

  componentDidMount() {
    const { name, age, breed } = this.props.dog;
    this.setState({
      //if not defined must be set to empty string because of text inputs
      name: name || "",
      age: age || "",
      breed: breed || ""
    });
  }

  handleAgeChange = e => {
    this.setState({
      age: parseInt(e.target.value)
    });
  };

  handleBreedChange = e => {
    this.setState({
      breed: e.target.value
    });
  };

  handleNameChange = e => {
    this.setState({
      name: e.target.value
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="grid">
          <div className="grid__item grid__item--md-span-4">
            <TextField
              style={{
                width: "100%"
              }}
              label="Jméno"
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
              label="Věk"
              value={this.state.age}
              onChange={this.handleAgeChange}
              margin="normal"
            />
          </div>
          <div className="grid__item grid__item--md-span-4">
            <FormControl style={{ width: "100%", marginTop: 16 }}>
              <InputLabel shrink htmlFor="field-breed">
                Rasa
              </InputLabel>
              <Select
                style={{ width: "100%" }}
                value={this.state.breed}
                onChange={this.handleBreedChange}
                input={<Input id="field-breed" />}
              >
                {DOG_BREEDS.map(breed => (
                  <MenuItem key={breed.id} value={breed.id}>
                    {breed.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="mt10 text-right">
          {this.props.editable && (
            <Button
              style={{
                marginRight: 10
              }}
              onClick={() =>
                this.props.onEdit({
                  id: this.props.dog.id,
                  name: this.state.name,
                  age: this.state.age,
                  breed: this.state.breed
                })
              }
              variant="contained"
              color="primary"
            >
              Uložit
            </Button>
          )}
          <Button
            onClick={() => this.props.onRemove(this.props.dog.id)}
            variant="contained"
            color="secondary"
          >
            Smazat
          </Button>
        </div>
      </React.Fragment>
    );
  }
}

FormEditDog.propTypes = {
  dog: PropTypes.object,
  editable: PropTypes.bool,
  onRemove: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired
};

export default FormEditDog;
