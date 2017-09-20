import React from 'react';
import {Labels} from './Labels';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {toggleStar} from '../actions';

const Message = ({message, boxclicked, toggleStar}) => {
  return (
    <div className={`row message ${message.read ? 'read' : 'unread'}${message.selected ? ' selected' : ''}`}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input type="checkbox"  onChange={(e) => boxclicked(e, message.id)} checked={message.selected}/>
          </div>
          <div className="col-xs-2">
            <i className={`star fa fa-star${message.starred ? '' : '-o'}`} onClick={(e) => toggleStar(message)}></i>
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

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleStar,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Message);
