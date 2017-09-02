import React from 'react';
import Message from './Message';

const Messages = ({messages, boxclicked}) => {
  return (
    <div>
      {messages.map(message => <Message key={message.id} message={message} boxclicked={boxclicked}/>)}
    </div>
  )
}

export default Messages
