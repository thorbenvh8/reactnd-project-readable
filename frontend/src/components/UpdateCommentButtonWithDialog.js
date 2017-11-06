import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import queryString from 'query-string'
import { updateComment } from '../actions/comments'
import Modal from 'react-modal'
import * as API from '../utils/api'
import FaPencil from 'react-icons/lib/fa/pencil'

class CreateUpdateCommentButtonWithDialog extends Component {
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
    var queryParams = queryString.parse(this.props.location.search)
    return (
      <div>
        <Link to={this.props.location.pathname + "?updateCommentId=" + this.state.comment.id} onClick={this.onOpen}>
          <FaPencil size={30}/>
        </Link>
        <Modal
          isOpen={this.state.isOpen}
          onRequestClose={this.onClose}
        >
          <form onSubmit={this.handleSubmit}>
            <h1>Update Comment</h1>
            <label>
              Body:
              <textarea name="name" value={this.state.comment.body} onChange={this.handleBodyChange}/>
            </label>
            <label>
              Author:
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
  )(CreateUpdateCommentButtonWithDialog)
)
