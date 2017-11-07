import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import '../css/UpdateCommentButtonWithDialog.css'
import queryString from 'query-string'
import { updateComment } from '../actions/comments'
import Modal from 'react-modal'
import * as API from '../utils/api'
import FaPencil from 'react-icons/lib/fa/pencil'

class UpdateCommentButtonWithDialog extends Component {
  constructor(props) {
    super(props);

    var queryParams = queryString.parse(props.location.search)
    this.state = {
      comment: props.comment,
      isOpen: queryParams.updateCommentId !== undefined && queryParams.updateCommentId === props.comment.id
    }
  }

  componentWillReceiveProps(props) {
    var queryParams = queryString.parse(props.location.search)
    this.setState({
      comment: props.comment,
      isOpen: queryParams.updateCommentId !== undefined && queryParams.updateCommentId === props.comment.id
    })
  }

  handleBodyChange = (event) => {
    var comment = this.state.comment
    comment.body = event.target.value
    this.setState({comment})
  }

  handleAuthorChange = (event) => {
    var comment = this.state.comment
    comment.author = event.target.value
    this.setState({comment})
  }

  handleSubmit = (event) => {
    event.preventDefault()

    API.updateComment(this.state.comment.id, this.state.comment)
      .then(
        comment => {
          this.props.updateComment({comment})
          this.onClose()
        }
      )
  }

  onOpen = (event) => {
    event.preventDefault()

    this.props.history.push(this.props.location.pathname + "?updateCommentId=" + this.state.comment.id)
    this.setState({
      isOpen: true
    })
  }

  onClose = () => {
    this.props.history.push(this.props.location.pathname)
    this.setState({
      isOpen: false
    })
  }

  render() {
    return (
      <div className="UpdateCommentButtonWithDialog">
        <Link to={this.props.location.pathname + "?updateCommentId=" + this.state.comment.id} onClick={this.onOpen}>
          <FaPencil size={20}/>
        </Link>
        <Modal
          isOpen={this.state.isOpen}
          onRequestClose={this.onClose}
        >
          <form onSubmit={this.handleSubmit}>
            <h2>Update comment</h2>
            <label>
              <div>Body:</div>
              <textarea name="name" value={this.state.comment.body} onChange={this.handleBodyChange}/>
            </label>
            <label>
              <div>Author:</div>
              <input type="text" name="name" value={this.state.comment.author} onChange={this.handleAuthorChange}/>
            </label>
            <input type="submit" value="Update" />
            <button onClick={this.onClose}>Cancel</button>
          </form>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  return {}
}

function mapDispatchToProps (dispatch) {
  return {
    updateComment: (data) => dispatch(updateComment(data))
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(UpdateCommentButtonWithDialog)
)
