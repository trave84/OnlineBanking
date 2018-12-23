import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  setAllowRegistration,
  setDisableBalanceOnAdd,
  setDisableBalanceOnEdit
} from "../../actions/settingsActions.jsx";

class Settings extends Component {
  render() {
    const {
      disableBalanceOnAdd,
      disableBalanceOnEdit,
      allowRegistration
    } = this.props.settings;

    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <Link to="/" className="btn btn-link">
              <i className="fas fa-arrow-circle-left" /> Back to Dashboard
            </Link>
          </div>
        </div>
        <div className="card">
          <div className="card-header">Edit Settings</div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <label>Allow Registration</label>
                <input
                  type="checkbox"
                  name="allowRegistration"
                  checked={!!allowRegistration}
                  onChange={this.setAllowRegistrationChange}
                />
              </div>
              <div className="form-group">
                <label>Disabled Balance on Add</label>
                <input
                  type="checkbox"
                  name="disableBalanceOnAdd"
                  checked={!!allowRegistration}
                  onChange={this.disableBalanceOnAddChange}
                />
              </div>
              <div className="form-group">
                <label>Disabled Balance on Edit</label>
                <input
                  type="checkbox"
                  name="disableBalanceOnEdit"
                  checked={!!allowRegistration}
                  onChange={this.disableBalanceOnEditChange}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  settings: PropTypes.object.isRequired,
  setDisableBalanceOnAdd: PropTypes.object.isRequired,
  setDisableBalanceOnEdit: PropTypes.object.isRequired,
  setAllowRegistration: PropTypes.object.isRequired
};

export default connect(
  // BRING IN: redux States and ASSIGN them to PROPS here:
  (state, props) => ({
    auth: state.firebase.auth,
    settings: state.settings
  }),
  // Actions
  { setAllowRegistration, setDisableBalanceOnAdd, setDisableBalanceOnEdit }
)(Settings);
