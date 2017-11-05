import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import queryString from 'query-string'
import { updatePost, createPost } from '../actions/posts'
import Modal from 'react-modal'
import * as API from '../utils/api'
import FaPencil from 'react-icons/lib/fa/pencil'

class CreateUpdatePostButtonWithDialog extends Component {
  constructor(props) {
    super(props);

    var post = props.post ? props.post : {
      title: '',
      author: '',
      category: '',
      body: ''
    }

    this.state = {
      post
    }
  }

  handleTitleChange = (event) => {
    var post = this.state.post
    post.title = event.target.value
    this.setState({post})
  }

  handleAuthorChange = (event) => {
    var post = this.state.post
    post.author = event.target.value
    this.setState({post})
  }

  handleCategoryChange = (event) => {
    var post = this.state.post
    post.category = event.target.value
    this.setState({post})
  }

  handleBodyChange = (event) => {
    var post = this.state.post
    post.body = event.target.value
    this.setState({post})
  }

  handleSubmit = (event) => {
    event.preventDefault()

    if (this.state.post.category === '') {
      alert("Select a category")
      return
    }

    if (this.state.post.id === undefined) {
      var post = this.state.post
      API.createPost(post)
        .then(post => {
          this.props.createPost({post})
          this.props.history.push(this.props.location.pathname)
        })
      return
    }
    API.updatePost(this.state.post.id, this.state.post)
      .then(
        post => {
          this.props.updatePost({post})
          this.props.history.push(this.props.location.pathname)
        }
      )
  }

  render() {
    var queryParams = queryString.parse(this.props.location.search)
    return (
      <div>
        <Link to={
          this.state.post.id === undefined ?
          this.props.location.pathname + "?createPost=true" :
          this.props.location.pathname + "?updatePostId=" + this.state.post.id
        }>
          <FaPencil size={30}/>
        </Link>
        <Modal
          isOpen={
            (this.state.post.id === undefined && queryParams.createPost === 'true') ||
            (this.state.post.id !== undefined && queryParams.updatePostId === this.state.post.id)
          }
          onRequestClose={() => this.props.history.push(this.props.location.pathname)}
        >
          <form onSubmit={this.handleSubmit}>
            <h1>Edit Post</h1>
            <label>
              Title:
              <input type="text" name="name" value={this.state.post.title} onChange={this.handleTitleChange}/>
            </label>
            <label>
              Author:
              <input type="text" name="name" value={this.state.post.author} onChange={this.handleAuthorChange}/>
            </label>
            <label>
              Category:
              <select value={this.state.post.category} onChange={this.handleCategoryChange}>
                <option key="empty" value="" disabled>select ..</option>
                { this.props.categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </label>
            <label>
              Body:
              <textarea name="name" value={this.state.post.body} onChange={this.handleBodyChange}/>
            </label>
            <input type="submit" value="Submit" />
            <Link to={this.props.location.pathname}>Cancel</Link>
          </form>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps ({ categories }, ownProps) {
  return {
    categories: categories.list.map(category => category.name)
  }
}

function mapDispatchToProps (dispatch) {
  return {
    updatePost: (data) => dispatch(updatePost(data)),
    createPost: (data) => dispatch(createPost(data))
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CreateUpdatePostButtonWithDialog)
)
