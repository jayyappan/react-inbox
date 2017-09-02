import React from 'react';
import Message from './Message';

const Messages = ({messages, boxclicked, starclicked}) => {
  return (
    <div>
      {messages.map(message => <Message key={message.id} message={message} boxclicked={boxclicked} starclicked={starclicked}/>)}
    </div>
  )
}

export default Messages
