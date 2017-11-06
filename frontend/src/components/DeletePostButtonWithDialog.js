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
          <FaTrashO size={30}/>
        </Link>
        <Modal
          isOpen={this.props.post.id !== undefined && queryParams.deletePostId === this.props.post.id}
          onRequestClose={() => this.props.history.push(this.props.location.pathname)}
        >
          <h1>Delete Post</h1>
          <p>Do you really want to delete {this.props.post.title} by {this.props.post.author}?</p>
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
