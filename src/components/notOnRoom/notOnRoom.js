import "./notOnRoom.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import sa from "sweetalert2";
import LastPlay from "../lastPlay/lastplay";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      code: "Aucun",
      codeJoin: "",
      error: "",
    };

    this.props.socket.on("getCode", (msg) => {
      this.setState({ code: msg.code });
    });

    this.props.socket.on("joinRoom", (msg) => {
      if (msg.error != null) {
        sa.fire(
          "Un problème est survenue",
          msg.error + " (" + this.state.codeJoin + ")",
          "error"
        );
      } else {
        this.setState({ code: msg.code });
      }
    });
  }

  render() {
    return (
      <div className="h-100 blue">
        <div className="row h-100 mx-0">
          <div className="container col-12 col-lg-9 col-xl-6 h-100">
            <div className="row align-items-center h-100">
              <div className="col-12">
                <div className="h-100 bg-light rounded justify-content-center py-3">
                  <h1>Morpion !</h1>
                  <div className="row w-100 mt-5 mx-0">
                    <div className="col-12 col-md-6">
                      <label for="SalleCode" className="h3 mb-5">
                        Code de la salle
                      </label>
                      {this.state.code !== "Aucun" ? (
                        <h4>
                          Le code de votre partie est :{" "}
                          <span
                            className="text-success codeCopy"
                            onClick={() => {
                              navigator.clipboard.writeText(this.state.code);
                              sa.fire({
                                position: "center",
                                icon: "success",
                                title: "Le code a été copié",
                                showConfirmButton: false,
                                timer: 1500,
                              });
                            }}
                          >
                            {this.state.code}
                          </span>
                        </h4>
                      ) : (
                        <input
                          placeholder="Code de la salle"
                          type="text"
                          className="form-control text-center"
                          aria-label="Large"
                          aria-describedby="inputGroup-sizing-sm"
                          onChange={(e) => {
                            this.setState({ codeJoin: e.target.value });
                          }}
                        />
                      )}
                      <button
                        type="button"
                        className="btn btn-primary btn-lg mt-3"
                        disabled={this.state.code !== "Aucun"}
                        onClick={() => {
                          this.props.socket.emit("joinRoom", {
                            code: this.state.codeJoin,
                          });
                        }}
                      >
                        Rejoindre
                      </button>
                      <h4 className="my-4">OU</h4>
                      <button
                        type="button"
                        className="btn btn-primary btn-lg"
                        onClick={() => {
                          this.props.socket.emit("getCode", {
                            code: this.state.code,
                          });
                        }}
                      >
                        Creer une salle
                      </button>
                    </div>
                    <div className="col-12 col-md-6 mt-md-0 mt-4">
                      <h3>Dernier partie jouée :</h3>
                      <div className="lastGame">{this.renderLastGame()}</div>
                    </div>
                  </div>
                  <p className="text-dark text-center mt-5">
                    Ce site est actuellement en cour de construction ! Le style
                    n'est pas terminé ! En cas de bug contacter Blizz#6699 sur
                    Discord
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderLastGame() {
    let lastGameList = this.props.lastplay;

    let result = [];
    lastGameList.forEach((value, i) => {
      result.push(
        <LastPlay key={i} value={value} socket={this.props.socket} />
      );
    });

    return result;
  }
}
