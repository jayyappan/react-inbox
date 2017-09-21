import React from 'react';
import Message from './Message';
import Compose from './Compose';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {toggleStar} from '../actions';

const Messages = ({messages, composeState}) => {
  return (
    <div>
      { composeState &&
        <Compose />
      }
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
