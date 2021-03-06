import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addMessage} from '../actions';
import {Link} from 'react-router-dom';

const Compose = ({addMessage, history}) => {

  const createMessage = (e) => {
    e.preventDefault();
    addMessage(e.target.subject.value, e.target.body.value)
    history.push('/')
  }

  return (
    <form className="form-horizontal well" onSubmit={createMessage}>
      <div className="form-group">
        <div className="col-sm-8 col-sm-offset-2">
          <h4>Compose Message</h4>
        </div>
      </div>
      <div className="form-group">
        <label for="subject" className="col-sm-2 control-label">Subject</label>
        <div className="col-sm-8">
          <input type="text" className="form-control" id="subject" placeholder="Enter a subject" name="subject" />
        </div>
      </div>
      <div className="form-group">
        <label for="body" className="col-sm-2 control-label">Body</label>
        <div className="col-sm-8">
          <textarea name="body" id="body" className="form-control"></textarea>
        </div>
      </div>
      <div className="form-group">
        <div className="col-sm-8 col-sm-offset-2">
          <input type="submit" value="Send" className="btn btn-primary" />
        </div>
      </div>
    </form>
  )
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => bindActionCreators({
  addMessage,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Compose);
