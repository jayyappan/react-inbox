import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Toolbar from './components/Toolbar';
import Messages from './components/Messages';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {initialLoad} from './actions';
import {BrowserRouter as Router, Link} from 'react-router-dom';

class App extends Component {
  constructor (props) {
    super(props)
    this.selected = {}
    this.state = {messages : [], compose: false}
  }

  componentDidMount() {
    this.props.initialLoad()
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Toolbar />
          <Messages />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => bindActionCreators({
  initialLoad,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
