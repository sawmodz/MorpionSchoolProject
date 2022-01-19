import "./App.css";
import React from "react";
import ReactDOM from "react-dom";
import NotOnRoom from "./components/notOnRoom/notOnRoom";
import OnRoom from "./components/onRoom/onRoom";
import sa from "sweetalert2";
import gitCorner from "./img/git-corner.png";
const { io } = require("socket.io-client");
const socket = io("url", {
  transports: ["websocket"],
});

let isOnGaming = false;
let historique = [];
let code = "";
let yourSigne = "Aucune";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    socket.on("start", (msg) => {
      isOnGaming = msg.isInGame;
      code = msg.code;
      yourSigne = msg.yourSigne;
      this.setState({ isIngame: msg.isInGame });
    });

    socket.on("endGame", (msg) => {
      isOnGaming = msg.isInGame;
      code = "";
      this.setState({ isIngame: msg.isInGame });
      sa.fire("Bien joué !", "Vous avez gagné", "success");
    });

    socket.on("win", (msg) => {
      isOnGaming = msg.isInGame;
      historique = msg.history;
      code = "";
      this.setState({ isIngame: msg.isInGame, history: msg.history });
      sa.fire("Bien joué !", "Vous avez gagné", "success");
    });

    socket.on("loose", (msg) => {
      isOnGaming = msg.isInGame;
      historique = msg.history;
      code = "";
      this.setState({ isIngame: msg.isInGame, history: msg.history });
      sa.fire("Dommage !", "Vous avez perdu", "error");
    });

    socket.on("egalite", (msg) => {
      isOnGaming = msg.isInGame;
      historique = msg.history;
      code = "";
      this.setState({ isIngame: msg.isInGame, history: msg.history });
      sa.fire("Dommage !", "Vous avez fait un égalité", "warning");
    });

    socket.on("error", (msg) => {
      isOnGaming = msg.isInGame;
      historique = msg.history;
      code = "";
      this.setState({ isIngame: msg.isInGame });
      sa.fire("Un problème est survenue !", msg.msg, "error");
    });

    socket.on("replay", (msg) => {
      if (msg.error) {
        sa.fire("Un problème est survenue !", msg.message, "error");
      } else {
        if (msg.demande) {
          sa.fire({
            title: msg.id + " demande pour prendre une revanche",
            icon: "info",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Accepter",
            denyButtonText: `Refuser`,
          }).then((result) => {
            if (result.isConfirmed) {
              socket.emit("replay", { replay: true, id: msg.id, code: code });
            }
          });
        }
      }
    });
  }

  state = {
    isInGame: false,
    nickname: "",
    code: "",
    lastplay: [],
  };

  render() {
    return (
      <div className="main blue">
        <a href="https://github.com/sawmodz/MorpionSchoolProject">
          <img src={gitCorner} alt="gitCorner" className="gitCorner" />
        </a>
        {isOnGaming ? (
          <OnRoom code={code} socket={socket} signe={yourSigne} />
        ) : (
          <NotOnRoom
            lastplay={historique}
            socket={socket}
            nickname={this.state.nickname}
          />
        )}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
