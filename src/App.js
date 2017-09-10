import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Toolbar from './components/Toolbar';
import Messages from './components/Messages';

class App extends Component {
  constructor (props) {
    const messages = []
    super(props)
    this.state = {messages : messages}
  }

async componentDidMount() {
  const response = await fetch("http://localhost:3001/api/messages")
  const json = await response.json()
  const messages = json._embedded.messages
  this.setState({messages: messages})
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
