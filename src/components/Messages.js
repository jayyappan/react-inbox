import React from 'react';
import Message from './Message';
import Compose from './Compose';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {toggleStar} from '../actions';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

const Messages = ({messages, composeState}) => {
  return (
    <div>
      <Route path="/compose" component={Compose} />
      {messages.map(message => <Message key={message.id} message={message}/>)}
    </div>
  )
}

const mapStateToProps = state => ({
  messages: state.messages.all,
  composeState: state.toolbar.composeState,
})

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Messages);
