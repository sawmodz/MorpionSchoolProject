import "./onRoom.css";
import React from "react";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      morpion: [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ],
      signe: "X",
    };

    this.props.socket.on("play", (msg) => {
      this.setState({ morpion: msg.morpion, signe: msg.signe });
    });
  }

  render() {
    const clickOnCase = (x, y) => {
      this.props.socket.emit("play", {
        code: this.props.code,
        signe: this.state.signe,
        morpion: this.state.morpion,
        x: x,
        y: y,
      });
    };

    return (
      <div id="Jeu">
        <h2>Morpion</h2>

        <h3>Tu est {this.props.signe}</h3>
        <h3>
          {this.state.signe !== this.props.signe
            ? "A ton tour de jouer"
            : "Au tour de l'adversaire"}
        </h3>

        <div>
          <button onClick={() => clickOnCase(0, 0)}>
            {this.state.morpion[0][0]}
          </button>
          <button onClick={() => clickOnCase(0, 1)}>
            {this.state.morpion[0][1]}
          </button>
          <button onClick={() => clickOnCase(0, 2)}>
            {this.state.morpion[0][2]}
          </button>
        </div>
        <div>
          <button onClick={() => clickOnCase(1, 0)}>
            {this.state.morpion[1][0]}
          </button>
          <button onClick={() => clickOnCase(1, 1)}>
            {this.state.morpion[1][1]}
          </button>
          <button onClick={() => clickOnCase(1, 2)}>
            {this.state.morpion[1][2]}
          </button>
        </div>
        <div>
          <button onClick={() => clickOnCase(2, 0)}>
            {this.state.morpion[2][0]}
          </button>
          <button onClick={() => clickOnCase(2, 1)}>
            {this.state.morpion[2][1]}
          </button>
          <button onClick={() => clickOnCase(2, 2)}>
            {this.state.morpion[2][2]}
          </button>
        </div>
      </div>
    );
  }
}
