import "./notOnRoom.css";
import React from "react";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      code: "Aucun",
      nickname: "User",
      codeJoin: "",
      error: "",
    };

    this.props.socket.on("getCode", (msg) => {
      this.setState({ code: msg.code, nickname: this.state.nickname });
    });

    this.props.socket.on("joinRoom", (msg) => {
      if (msg.error != null) {
        this.setState({ error: msg.error });
      } else {
        this.setState({ code: msg.code });
      }
    });
  }

  render() {
    return (
      <div className="main">
        <h2>Entre ton pseudo</h2>
        <input
          type="text"
          placeholder="Votre Pseudo"
          onChange={(e) => {
            this.setState({ nickname: e.target.value });
          }}
        ></input>

        <button
          onClick={() => {
            this.props.socket.emit("getCode");
          }}
        >
          Creer une salle
        </button>
        <br />
        <input
          type="text"
          placeholder="Code de la salle"
          onChange={(e) => {
            this.setState({ codeJoin: e.target.value });
          }}
        ></input>
        <button
          onClick={() => {
            this.props.socket.emit("joinRoom", {
              code: this.state.codeJoin,
              nickname: this.state.nickname,
            });
          }}
        >
          Rejoindre une salle
        </button>

        {this.state.code === "Aucun" ? (
          <h2>Bienvenue sur le morpion</h2>
        ) : (
          <h2>Le code de votre partie est : {this.state.code}</h2>
        )}

        <h2 colors="red">{this.state.error}</h2>
      </div>
    );
  }
}
