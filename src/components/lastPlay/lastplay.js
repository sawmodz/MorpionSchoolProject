import "./lastPlay.css";
import React from "react";

export default class LastPlay extends React.Component {
  render() {
    return (
      <div className="container rounded border my-1">
        <div className="row">
          <div className="col-4 text-start mt-3">
            <p>
              {this.props.value.id > 10
                ? this.props.value.id
                : this.props.value.id.substring(0, 10)}
            </p>
            <p>Resultat : {this.props.value.result}</p>
          </div>
          <div className="col-4 offset-4 mt-3">
            <p>Tu jouais les : {this.props.value.play}</p>
            <div className="d-grid gap-2">
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => {
                  console.log(this.props.socket);
                  this.props.socket.emit("replay", {
                    id: this.props.value.id,
                  });
                }}
              >
                Revanche
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
