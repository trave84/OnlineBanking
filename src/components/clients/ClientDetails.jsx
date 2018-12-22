import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import classnames from "classnames";

import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
// import { firestore } from "firebase";

import Spinner from "../layout/Spinner";

class ClientDetails extends Component {
  state = {
    showBalanceUpdate: false,
    balanceUpdateAmount: ""
  };

  // Input Field: State change
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  //Submitted Form: UPDATE inputs to FireStore
  balanceSubmit = e => {
    e.preventDefault();

    const { client, firestore } = this.props;
    const { balanceUpdateAmount } = this.state;

    const clientUpdate = {
      balance: parseFloat(balanceUpdateAmount && balanceUpdateAmount)
    };

    //UPDATE: in FS
    if (balanceUpdateAmount) {
      firestore.update({ collection: "clients", doc: client.id }, clientUpdate);
    }
  };

  // Delete Client
  onDeleteClick = () => {
    const { client, firestore, history } = this.props;

    firestore
      .delete({ collection: "clients", doc: client.id })
      .then(history.push("/"));
  };

  render() {
    const { client } = this.props;
    const { showBalanceUpdate, balanceUpdateAmount } = this.state;

    let balanceForm = "";

    //IF balanceForm should display
    if (showBalanceUpdate) {
      balanceForm = (
        <form onSubmit={this.balanceSubmit}>
          {/* Update Field */}
          <div className="input-group">
            <input
              type="number"
              className="form-control"
              name="balanceUpdateAmount"
              placeholder="Add New Balance"
              value={balanceUpdateAmount}
              onChange={this.onChange}
            />
          </div>
          {/* APPEND:  Update Submit Btn */}
          <div className="input-group-append">
            <input
              type="submit"
              value="Update"
              className="btn btn-outline-dark"
            />
          </div>
        </form>
      );
    } else {
      balanceForm = null;
    }

    if (client) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/" className="btn btn-link">
                <i className="fas fa-arrow-circle-left"> Back to Dashboard</i>
              </Link>
            </div>
            <div className="col-md-6">
              <div className="btn-group foat-right">
                <Link to={`/client/edit/${client.id}`} className="btn btn-dark">
                  Edit
                </Link>
                <div className="btn btn-danger" onClick={this.onDeleteClick}>
                  Delete
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="card">
            <h3 className="card-header">
              {client.firstName} {client.lastName}
            </h3>
            <div className="card-body">
              <div className="row">
                <div className="col-md-8 col-sm-6">
                  <h4>
                    Client Id:{" "}
                    <span className="text-secondary">{client.id}</span>
                  </h4>
                </div>
                <div className="col-md-4 col-sm-6">
                  <h4 className="pull-right">
                    Balance (&#75;&#269;):{" "}
                    <span
                      className={classnames({
                        "text-danger": client.balance > 0,
                        "text-success": client.balance === 0
                      })}
                    >
                      {parseFloat(client.balance).toFixed(2)}
                    </span>{" "}
                    <small>
                      {/* Add Pencil to Update */}
                      <a
                        href="#!"
                        onClick={() =>
                          this.setState({
                            showBalanceUpdate: !this.state.showBalanceUpdate
                          })
                        }
                      >
                        <i className="fas fa-pencil-alt" />
                      </a>
                    </small>
                  </h4>
                  {balanceForm}
                </div>
              </div>

              <hr />
              <ul className="list-group">
                <li className="list-group-item">Email: {client.email}</li>
                <li className="list-group-item">Phone: {client.phone}</li>
              </ul>
            </div>
          </div>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

ClientDetails.propTypes = {
  firestore: PropTypes.object.isRequired
};

// SIMILAR TO: (Clients)
export default compose(
  // GET clients (FB Collection)
  firestoreConnect(props => [
    //STORE singe Client in 'client', doc: URL.id
    { collection: "clients", storeAs: "client", doc: props.match.params.id }
  ]),
  // MAP new props TO state here/ Descructure ordered
  connect(({ firestore: { ordered } }, props) => ({
    // props:state
    client: ordered.client && ordered.client[0] // client: FS collection.state
  }))
)(ClientDetails); //name of Component
