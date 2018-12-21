import React, { Component } from "react";
import { Link } from "react-router-dom";

class Clients extends Component {
  render() {
    const clients = [
      {
        id: "347814",
        firstName: "Kev",
        lastName: "Gmes",
        email: "a@gmailcom",
        phone: "3434 4323",
        balance: "34500"
      }
    ];

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
                // KEY ot ID
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
export default Clients;
