import React from 'react';
import {Labels} from './Labels';

const Message = ({message, boxclicked, starclicked}) => {
  return (
    <div className={`row message ${message.read ? 'read' : 'unread'}${message.selected ? ' selected' : ''}`}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input type="checkbox"  onChange={(e) => boxclicked(e, message.id)} checked={message.selected}/>
          </div>
          <div className="col-xs-2" onClick={starclicked}>
            <i className={`star fa fa-star${message.starred ? '' : '-o'}`} onClick={starclicked}></i>
          </div>
        </div>
      </div>
      <div className="col-xs-11">
         {Labels(message.labels)}
        <a href="#">
          {message.subject}
        </a>
      </div>
    </div>
  )
}

export default Message
