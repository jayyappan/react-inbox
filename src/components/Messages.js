import React from 'react';
import Message from './Message';
import Compose from './Compose';

const Messages = ({messages, compose, boxclicked, starclicked, composeMessage}) => {
  return (
    <div>
      { compose &&
        <Compose composeMessage={composeMessage}/>
      }
      {messages.map(message => <Message key={message.id} message={message} boxclicked={boxclicked} starclicked={starclicked}/>)}
    </div>
  )
}

export default Messages
