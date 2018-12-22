import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
// import { firestore } from "firebase";

import Spinner from "../layout/Spinner";

class Clients extends Component {
  state = {
    totalOwed: null
  };

  // Static NEEDS ONLY [props]
  static getDerivedStateFromProps(props, state) {
    const { clients } = props;

    if (clients) {
      // Add to total
      const total = clients.reduce((total, client) => {
        return total + parseFloat(client.balance.toString());
      }, 0);
      return { totalOwed: total };
    }
    return null;
  }

  render() {
    // PULL data OUT of FS mapped Props
    const { clients } = this.props;
    const { totalOwed } = this.state;

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
          <h5 class="text-right text-secondary">
            Total Owed:{" "}
            <span className="text-primary">
              CZK {parseFloat(totalOwed.toFixed(2))}
            </span>
          </h5>
          <table className="table table-hover">
            <thead className="thead-light">
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
      return <Spinner />;
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
