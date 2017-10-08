import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Route, Link, Switch} from 'react-router-dom';
import {selectunselectmessages, markAsRead, markAsUnRead, applyLabel, removeLabel, deleteMessages, toggleCompose} from '../actions';

const Toolbar = ({messages,
                  selected,
                  composeState,
                  markAsRead,
                  markAsUnRead,
                  applyLabel,
                  removeLabel,
                  deleteMessages,
                  selectunselectmessages,
                  toggleCompose}) => {

  let numSelected = 0
  let numUnreadMessages = messages.reduce(((acum, message) => {
    numSelected += (selected[message.id] ? 1 : 0)
    return message.read ? acum : acum + 1
  }),0)

  return (
    <div className="row toolbar">
      <div className="col-md-12">
        <p className="pull-right">
          <span className="badge badge">{numUnreadMessages}</span>
          unread messages
        </p>

        <Switch>
          <Route exact path="/" render={() => <Link to="/compose" className="btn btn-danger" onClick={(e) => toggleCompose(composeState)}>
            <i className="fa fa-plus"></i>
          </Link>} />
          <Route path="/compose" render={() => <Link to="/" className="btn btn-danger" onClick={(e) => toggleCompose(composeState)}>
            <i className="fa fa-plus"></i>
          </Link>} />
          <Route path="/messages" render={() => <Link to="/compose" className="btn btn-danger" onClick={(e) => toggleCompose(composeState)}>
            <i className="fa fa-plus"></i>
          </Link>} />
        </Switch>



        <button title="Select/Unselect Messages" className="btn btn-default" onClick={(e) => selectunselectmessages(!(numSelected === messages.length), messages)}>
          <i className={`fa fa-${numSelected === 0 ? '' : numSelected === messages.length ? 'check-' : 'minus-'}square-o`}></i>
        </button>

        <button title="Mark as Read" className="btn btn-default" onClick={(e) => markAsRead(selected, messages)} disabled={numSelected === 0}>
          Mark As Read
        </button>

        <button title="Mark as Unread" className="btn btn-default" onClick={(e) => markAsUnRead(selected, messages)} disabled={numSelected === 0}>
          Mark As Unread
        </button>

        <select title="Apply label" className="form-control label-select" onChange={(e) => applyLabel(selected, messages, e.target.value)} disabled={numSelected === 0}>
          <option>Apply label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <select title="Remove label" className="form-control label-select" onChange={(e) => removeLabel(selected, messages, e.target.value)} disabled={numSelected === 0}>
          <option>Remove label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <button title="Delete Messages" className="btn btn-default" onClick={(e) => deleteMessages(selected, messages)} disabled={numSelected === 0}>
          <i className="fa fa-trash-o"></i>
        </button>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  messages: state.messages.all,
  selected: state.messages.selected,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  selectunselectmessages,
  markAsRead,
  markAsUnRead,
  applyLabel,
  removeLabel,
  deleteMessages,
  toggleCompose,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Toolbar);
