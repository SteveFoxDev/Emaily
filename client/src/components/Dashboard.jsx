import { Component } from "react";
import { Link } from "react-router-dom";

class Dashboard extends Component {
  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        <p>Survey Data...</p>
        <div className="fixed-action-btn">
          <Link className="btn-floating btn-large blue-grey" to="/surveys/new">
            <i className="material-icons">add</i>
          </Link>
        </div>
      </div>
    );
  }
}

export default Dashboard;
