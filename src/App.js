import "./App.css";
import React from "react";
import ReactDOM from "react-dom";
import NotOnRoom from "./components/notOnRoom/notOnRoom";
import OnRoom from "./components/onRoom/onRoom";
const { io } = require("socket.io-client");
const socket = io("http://10.35.12.24:3001", { transports: ["websocket"] });

let isOnGaming = false;
let code = "";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    socket.on("start", (msg) => {
      isOnGaming = msg.isInGame;
      code = msg.code;
      this.setState({ isIngame: msg.isInGame });
    });
  }

  state = {
    isInGame: false,
    nickname: "",
    code: "",
  };

  render() {
    return (
      <div className="main">
        {isOnGaming ? (
          <OnRoom code={code} socket={socket} />
        ) : (
          <NotOnRoom socket={socket} nickname={this.state.nickname} />
        )}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
