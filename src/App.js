import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Toolbar from './components/Toolbar';
import Messages from './components/Messages';

class App extends Component {
  constructor (props) {
    const messages = [
    {
      "id": 1,
      "subject": "You can't input the protocol without calculating the mobile RSS protocol!",
      "read": false,
      "starred": true,
      "labels": ["dev", "personal"],
      "selected": false
    },
    {
      "id": 2,
      "subject": "connecting the system won't do anything, we need to input the mobile AI panel!",
      "read": false,
      "starred": false,
      "selected": true,
      "labels": [],
      "selected": false
    },
    {
      "id": 3,
      "subject": "Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!",
      "read": false,
      "starred": true,
      "labels": ["dev"],
      "selected": false
    },
    {
      "id": 4,
      "subject": "We need to program the primary TCP hard drive!",
      "read": true,
      "starred": false,
      "selected": true,
      "labels": [],
      "selected": false
    },
    {
      "id": 5,
      "subject": "If we override the interface, we can get to the HTTP feed through the virtual EXE interface!",
      "read": false,
      "starred": false,
      "labels": ["personal"],
      "selected": false
    },
    {
      "id": 6,
      "subject": "We need to back up the wireless GB driver!",
      "read": true,
      "starred": true,
      "labels": [],
      "selected": false
    },
    {
      "id": 7,
      "subject": "We need to index the mobile PCI bus!",
      "read": true,
      "starred": false,
      "labels": ["dev", "personal"],
      "selected": false
    },
    {
      "id": 8,
      "subject": "If we connect the sensor, we can get to the HDD port through the redundant IB firewall!",
      "read": true,
      "starred": true,
      "labels": [],
      "selected": false
    }
    ]
    super(props)
    this.state = {messages : messages}
  }

  selectunselectmessages = (e, select) => {
    let newState = this.state.messages.map((message) => {
    let  newMessage = message
      newMessage.selected = select
      return message
    })
    this.setState({messages: newState})
  }

  checkboxclicked = (e, id) => {
    let newState = this.state.messages.map((message) => {
    let  newMessage = message
      if (message.id === id) {
        newMessage.selected = !message.selected
      }
      return message
    })
    this.setState({messages: newState})
  }

  starclicked = (e, id) => {
    let newState = this.state.messages.map((message) => {
    let  newMessage = message
      if (message.id === id) {
        newMessage.starred = !message.starred
      }
      return message
    })
    this.setState({messages: newState})
  }

  markasread = () => {
    let newState = this.state.messages.map((message) => {
    let  newMessage = message
      if (message.selected) {
        newMessage.read = true
      }
      return message
    })
    this.setState({messages: newState})
  }

  markasunread = () => {
    let newState = this.state.messages.map((message) => {
    let  newMessage = message
      if (message.selected) {
        newMessage.read = false
      }
      return message
    })
    this.setState({messages: newState})
  }

  applylabel = (e) => {
    console.log(e.target.value)
    let newState = this.state.messages.map((message) => {
    let  newMessage = message
      if (message.selected && e.target.value !== 'Apply label' && !message.labels.some(label => label === e.target.value)) {
        newMessage.labels = [...message.labels, e.target.value]
      }
      return message
    })
    this.setState({messages: newState})
  }

  removelabel = (e) => {
    let newState = this.state.messages.map((message) => {
    let  newMessage = message
      if (message.selected && e.target.value !== 'Remove label' && message.labels.some(label => label === e.target.value)) {
        newMessage.labels = message.labels.filter(item => item !== e.target.value)
      }
      return message
    })
    this.setState({messages: newState})
  }

  deletemessages = () => {
    let newState = this.state.messages.filter(message => (!message.selected))
    this.setState({messages: newState})
  }

  render() {
    return (
      <div className="App">
        <Toolbar messages={this.state.messages} markasread={this.markasread} markasunread={this.markasunread} applylabel={this.applylabel} removelabel={this.removelabel} deletemessages={this.deletemessages} selectunselectmessages={this.selectunselectmessages}/>
        <Messages messages={this.state.messages} boxclicked={this.checkboxclicked} starclicked={this.starclicked}/>
      </div>
    );
  }
}

export default App;
