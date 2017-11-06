import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import queryString from 'query-string'
import { deleteComment } from '../actions/comments'
import Modal from 'react-modal'
import * as API from '../utils/api'
import FaTrashO from 'react-icons/lib/fa/trash-o'

class DeleteCommentButtonWithDialog extends Component {
  constructor(props) {
    super(props);

    var queryParams = queryString.parse(props.location.search)
    this.state = {
      isOpen: queryParams.deleteCommentId !== undefined && queryParams.deleteCommentId === props.comment.id
    }
  }

  onDelete = () => {
    API.deleteComment(this.props.comment.id)
      .then(
        comment => {
          this.props.deleteComment({comment})
          this.props.history.push(this.props.location.pathname)
        }
      )
  }

  onOpen = (event) => {
    event.preventDefault()

    this.props.history.push(this.props.location.pathname + "?deleteCommentId=" + this.props.comment.id)
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
      <div>
        <Link to={this.props.location.pathname + "?deleteCommentId=" + this.props.comment.id} onClick={this.onOpen}>
          <FaTrashO size={30}/>
        </Link>
        <Modal
          isOpen={this.state.isOpen}
          onRequestClose={this.onClose}
        >
          <h1>Delete Comment</h1>
          <p>Do you really want to delete {this.props.comment.body} by {this.props.comment.author}?</p>
          <button onClick={this.onDelete}>Delete</button>
          <button onClick={this.onClose}>Cancel</button>
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
    deleteComment: (data) => dispatch(deleteComment(data))
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(DeleteCommentButtonWithDialog)
)
