import { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions/index';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Header from './components/Header';
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';
import SurveyNew from './components/surveys/SurveyNew';
import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <div>
        <Router>
          <Header />
          <div className="container">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/surveys" element={<Dashboard />} />
              <Route path="/surveys/new" element={<SurveyNew />} />
              <Route path="/*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Router>
      </div>
    );
  }
}

export default connect(null, actions)(App);
