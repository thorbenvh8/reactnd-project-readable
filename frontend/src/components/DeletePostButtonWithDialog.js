import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import '../css/DeletePostButtonWithDialog.css'
import queryString from 'query-string'
import { deletePost } from '../actions/posts'
import Modal from 'react-modal'
import * as API from '../utils/api'
import FaTrashO from 'react-icons/lib/fa/trash-o'

class DeletePostButtonWithDialog extends Component {
  onDelete = () => {
    API.deletePost(this.props.post.id)
      .then(
        post => {
          this.props.deletePost({post})
          this.props.history.push(this.props.location.pathname)
        }
      )
  }

  render() {
    var queryParams = queryString.parse(this.props.location.search)
    return (
      <div className="DeletePostButtonWithDialog">
        <Link to={this.props.location.pathname + "?deletePostId=" + this.props.post.id}>
          <FaTrashO size={20}/>
        </Link>
        <Modal
          isOpen={this.props.post.id !== undefined && queryParams.deletePostId === this.props.post.id}
          onRequestClose={() => this.props.history.push(this.props.location.pathname)}
        >
          <h2>Delete post</h2>
          <p>Do you really want to delete <b>{this.props.post.title}</b> by <i>{this.props.post.author}</i>?</p>
          <button onClick={this.onDelete}>Delete</button>
          <Link to={this.props.location.pathname}>Cancel</Link>
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
    deletePost: (data) => dispatch(deletePost(data))
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(DeletePostButtonWithDialog)
)
