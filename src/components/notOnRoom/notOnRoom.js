import "./notOnRoom.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import sa from "sweetalert2";

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
        <div className="container h-100">
          <div className="row align-items-center h-100">
            <div className="col-12">
              <div className="h-100 bg-light rounded justify-content-center py-3">
                <h1>Morpion !</h1>
                <div className="row w-110 mt-5">
                  <div className="col-6 offset-3">
                    <label for="SalleCode" className="h3">
                      Code de la salle
                    </label>
                    {this.state.code !== "Aucun" ? (
                      <h4>
                        Le code de votre partie est :{" "}
                        <span className="text-success">{this.state.code}</span>
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
                        console.log(this.state);
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
