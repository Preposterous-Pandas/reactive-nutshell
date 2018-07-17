import React, { Component } from "react";
// import Animal from "./Animal";
// import APIManager from "./APIManager";

export default class Chat extends Component {
  state = {};

  componentDidMount() {
    // APIManager.getAllAnimals().then(animals =>
    //   this.setState({
    //     animals: animals
    //   })
    // );
  }

  handleFieldChange = evt => {
    // const stateToChange = {};
    // // stateToChange.animals = this.state.animals;
    // stateToChange[evt.target.id] = evt.target.value;
    // this.setState(stateToChange);
  };

  createNewAnimal = (animalName, animalBreed) => {
    // APIManager.createNewAnimal(animalName, animalBreed).then(() => {
    //   APIManager.getAllAnimals().then(animalList => {
    //     this.setState({
    //       animals: animalList
    //     });
    //   });
    // });
  };

  checkOutAnimal = animalId => {
    // APIManager.checkOutAnimal(animalId).then(() => {
    //   APIManager.getAllAnimals().then(animalList => {
    //     this.setState({
    //       animals: animalList
    //     });
    //   });
    // });
  };

  render() {
    return (
      <React.Fragment>
        <div className="chat">
          <h2>Chat</h2>
        </div>
      </React.Fragment>
    );
  }
}
