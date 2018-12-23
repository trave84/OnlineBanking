import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
// import { firestore } from "firebase";

class AddClient extends Component {
  // INIT Input Values
  state = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    balance: ""
  };

  // Create Input Change Funcion // NO BIND NEEDED with ES6 ARROW
  onChange = e => {
    // MAP State[key:val] to  Attributes
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const newClient = this.state;

    // fireStoreConnect() ACCESS to PROPS+METHODS:
    const { firestore, history } = this.props;

    //IF balance NON EXISTENT
    if (newClient.balance === "") {
      newClient.balance = 0;
    }
    // ADD New Client to FS Data/ Collection 'clients'
    firestore
      .add({ collection: "clients" }, newClient)
      .then(() => history.push("/"));
  };

  render() {
    const { disableBalanceOnAdd } = this.props.settings;

    return (
      <div>
        <div className="row">
          <Link to="/" className="btn bn-link">
            <i className="fas fa-arrow-circle-left" /> Back to Dashboard
          </Link>
        </div>
        <div className="card">
          <div className="card-header">Add New Client</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  minLength="2"
                  required
                  onChange={this.onChange}
                  value={this.state.firstName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  minLength="2"
                  required
                  onChange={this.onChange}
                  value={this.state.lastName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  onChange={this.onChange}
                  value={this.state.email}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  minLength="10"
                  required
                  onChange={this.onChange}
                  value={this.state.phone}
                />
              </div>
              <div className="form-group">
                <label htmlFor="balance">Balance</label>
                <input
                  type="text"
                  className="form-control"
                  name="balance"
                  onChange={this.onChange}
                  value={this.state.balance}
                  disabled={disableBalanceOnAdd}
                />
              </div>
              <input
                type="submit"
                value="Submit"
                className="btn btn-primary btn-block"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

AddClient.propTypes = {
  firestore: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired
};

// DB Communication Connect
// this.props.firestore (with methods) WILL be AVAILABLE
export default compose(
  firestoreConnect(),
  connect((state, props) => ({
    settings: state.settings
  }))
)(AddClient);
