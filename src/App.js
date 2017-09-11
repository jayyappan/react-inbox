import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Toolbar from './components/Toolbar';
import Messages from './components/Messages';

class App extends Component {
  constructor (props) {
    super(props)
    this.selected = {}
    this.state = {messages : [], compose: false}
  }

  componentDidMount() {
    this.fetchMessges()
  }

  async fetchMessges() {
    const response = await fetch("http://localhost:3001/api/messages")
    const json = await response.json()
    const messages = json._embedded.messages
    let messagesWithSelected = messages.map(message => {
      message.selected = this.selected[message.id]
      return message
    })
    this.setState({messages: messagesWithSelected})
  }

  selectunselectmessages = (e, select) => {
    let newState = this.state.messages.map((message) => {
      let  newMessage = message
      newMessage.selected = select
      this.selected[message.id] = select
      return message
    })
    this.setState({messages: newState})
  }

  checkboxclicked = (e, id) => {
    let newState = this.state.messages.map((message) => {
      let  newMessage = message
      if (message.id === id) {
        newMessage.selected = !message.selected
        this.selected[id] = newMessage.selected
      }
      return message
    })
    this.setState({messages: newState})
  }

  starclicked = async (e, id) => {
    let requestBody = {
      "messageIds": [ id ],
      "command": "star",
      "star": !this.state.messages.find(message => (message.id == id)).starred
    }
    let status = await this.updateServer(requestBody)
    await this.fetchMessges()
  }

  markasread = async () => {
      let messageIds = this.state.messages.filter(message => (message.selected)).map(message => message.id)
      let requestBody = {
        "messageIds": messageIds,
        "command": "read",
        "read": true
      }
      let status = await this.updateServer(requestBody)
      await this.fetchMessges()
  }

  markasunread = async () => {
    let messageIds = this.state.messages.filter(message => (message.selected)).map(message => message.id)
    let requestBody = {
      "messageIds": messageIds,
      "command": "read",
      "read": false
    }
    let status = await this.updateServer(requestBody)
    await this.fetchMessges()
  }

  applylabel = async (e) => {
    let messageIds = this.state.messages.filter(message => message.selected && e.target.value !== 'Apply label' && !message.labels.some(label => label === e.target.value)).map(message => message.id)
    let requestBody = {
      "messageIds": messageIds,
      "command": "addLabel",
      "label": e.target.value
    }
    let status = await this.updateServer(requestBody)
    await this.fetchMessges()
  }

  removelabel = async (e) => {
    let messageIds = this.state.messages.filter(message => message.selected && e.target.value !== 'Remove label' && message.labels.some(label => label === e.target.value)).map(message => message.id)
    let requestBody = {
      "messageIds": messageIds,
      "command": "removeLabel",
      "label": e.target.value
    }
    let status = await this.updateServer(requestBody)
    await this.fetchMessges()
  }

  deletemessages = async () => {
    let messageIds = this.state.messages.filter(message => (message.selected)).map(message => message.id)
    let requestBody = {
      "messageIds": messageIds,
      "command": "delete"
    }
    let status = await this.updateServer(requestBody)
    await this.fetchMessges()
  }

  composeMessage = async (subject, body) => {
    let requestBody = {
      "subject": subject,
      "body": body
    }
    await this.addMessage(requestBody)
    await this.fetchMessges()
    this.toggleCompose()
  }

  composeClicked = () => {
    this.toggleCompose()
  }

  toggleCompose = () => {
    let compose = !this.state.compose
    this.setState({compose: compose})
  }

  async updateServer(requestBody) {
    const response = await fetch ("http://localhost:3001/api/messages", {
      method: 'PATCH',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    return response.status
  }

  async addMessage(requestBody) {
    const response = await fetch ("http://localhost:3001/api/messages", {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
  }

  render() {
    return (
      <div className="App">
        <Toolbar messages={this.state.messages}
                 markasread={this.markasread}
                 markasunread={this.markasunread}
                 applylabel={this.applylabel}
                 removelabel={this.removelabel}
                 deletemessages={this.deletemessages}
                 selectunselectmessages={this.selectunselectmessages}
                 composeClicked={this.composeClicked}
                 />
        <Messages messages={this.state.messages}
                  compose={this.state.compose}
                  boxclicked={this.checkboxclicked}
                  starclicked={this.starclicked}
                  composeMessage={this.composeMessage}/>
      </div>
    );
  }
}

export default App;
