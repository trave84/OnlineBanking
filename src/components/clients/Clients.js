import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
// import { firestore } from "firebase";

class Clients extends Component {
  render() {
    // PULL data OUT of FS mapped Props
    const { clients } = this.props;

    if (clients) {
      return (
        <div className="row">
          <div className="col-md-6 ">
            <h2>
              {" "}
              <i className="fas fa-users" /> Clients
            </h2>
          </div>
          <div className="col-md-6" />
          <table className="table">
            <thead className="inverse">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {clients.map(client => (
                // KEY to ID
                <tr key={client.id}>
                  <td>
                    {client.firstName} {client.lastName}
                  </td>
                  <td>{client.email}</td>
                  <td>{client.balance}</td>
                  <td>
                    <Link
                      to={`/client/${client.id}`}
                      className="btn btn-secondary btn-sm"
                    >
                      <i className="fas fa-arrow-circle-right"> Details</i>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else {
      return <h1>Loading..</h1>;
    }
  }
}

// ADDING Proptypes here
//Component.pts
Clients.propTypes = {
  firestore: PropTypes.object.isRequired,
  clients: PropTypes.array
};

export default compose(
  // GET clients (FB Collection)
  firestoreConnect([{ collection: "clients" }]),
  // MAP new props TO state here:
  connect((state, props) => ({
    // props:state
    clients: state.firestore.ordered.clients // clients: FS collection.state
  }))
)(Clients); //name of Component
