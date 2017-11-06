import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createComment } from '../actions/comments'
import * as API from '../utils/api'

class CreateComment extends Component {
  state = {
    comment: {
      body: '',
      author: ''
    }
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

    this.state.comment.parentId = this.props.postId

    API.createComment(this.state.comment)
      .then(
        comment => {
          this.props.createComment({comment})
          this.onClear()
        }
      )
  }

  onClear = () => {
    this.setState({
      comment: {
        body: '',
        author: ''
      }
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h1>Create Comment</h1>
          <label>
            Body:
            <textarea name="name" value={this.state.comment.body} onChange={this.handleBodyChange}/>
          </label>
          <label>
            Author:
            <input type="text" name="name" value={this.state.comment.author} onChange={this.handleAuthorChange}/>
          </label>
          <input type="submit" value="Create" />
          <button onClick={this.onClear}>Clear</button>
        </form>
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  return {}
}

function mapDispatchToProps (dispatch) {
  return {
    createComment: (data) => dispatch(createComment(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateComment)
