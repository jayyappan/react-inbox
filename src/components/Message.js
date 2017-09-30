import React from 'react';
import {Labels} from './Labels';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Route, Link, Switch} from 'react-router-dom';
import {toggleStar, toggleCheckBox, fetchMessageDetail} from '../actions';

const Message = ({match, message, selectedMessageDetail, selected, toggleCheckBox, toggleStar, fetchMessageDetail}) => {
  return (
    <div>
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
        <Link to={`/messages/${message.id}`} >
          <div className="col-xs-11" onClick={(e) => fetchMessageDetail(message.id)}>
            {Labels(message.labels)}
            {message.subject}
          </div>
        </Link>
      </div>
      <Route path={`/messages/${message.id}`} render={() => {
        if (selectedMessageDetail.id != message.id) {
          fetchMessageDetail(message.id)
        }
        return (
          <div className="row message-body">
            <div className="col-xs-11 col-xs-offset-1">
              {selectedMessageDetail.body}
            </div>
          </div>)
      }}/>
    </div>

  )
}

const mapStateToProps = state => ({
  selected: state.messages.selected,
  selectedMessageDetail: state.messages.selectedMessageDetail,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleStar,
  toggleCheckBox,
  fetchMessageDetail,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Message);
