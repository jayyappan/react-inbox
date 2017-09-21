import React from 'react';
import {Labels} from './Labels';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {toggleStar, toggleCheckBox} from '../actions';

const Message = ({message, selected, toggleCheckBox, toggleStar}) => {
  return (
    <div className={`row message ${message.read ? 'read' : 'unread'}${selected[message.id] ? ' selected' : ''}`}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input type="checkbox"  onChange={(e) => toggleCheckBox(message.id, selected)} checked={selected[message.id]}/>
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
  selected: state.messages.selected,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleStar,
  toggleCheckBox,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Message);
