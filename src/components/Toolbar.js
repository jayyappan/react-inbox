import React from 'react';

const Toolbar = ({messages, markasread, markasunread, applylabel, removelabel, deletemessages, selectunselectmessages}) => {
  let numUnreadMessages = messages.reduce(((acum, message) => message.read ? acum : acum + 1),0)
  let numSelected = messages.reduce(((acum, message) => message.selected ? acum + 1 : acum),0)

  return (
    <div className="row toolbar">
      <div className="col-md-12">
        <p className="pull-right">
          <span className="badge badge">{numUnreadMessages}</span>
          unread messages
        </p>

        <button className="btn btn-default" onClick={(e) => selectunselectmessages(e, !(numSelected === messages.length))}>
          <i className={`fa fa-${numSelected === 0 ? '' : numSelected === messages.length ? 'check-' : 'minus-'}square-o`}></i>
        </button>

        <button className="btn btn-default" onClick={markasread} disabled={numSelected === 0}>
          Mark As Read
        </button>

        <button className="btn btn-default" onClick={markasunread} disabled={numSelected === 0}>
          Mark As Unread
        </button>

        <select className="form-control label-select" onChange={applylabel} disabled={numSelected === 0}>
          <option>Apply label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <select className="form-control label-select" onChange={removelabel} disabled={numSelected === 0}>
          <option>Remove label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <button className="btn btn-default" onClick={deletemessages} disabled={numSelected === 0}>
          <i className="fa fa-trash-o"></i>
        </button>
      </div>
    </div>
  )
}

export default Toolbar
