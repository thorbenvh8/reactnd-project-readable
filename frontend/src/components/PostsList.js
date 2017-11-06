import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import '../css/PostsList.css'
import { updatePost } from '../actions/posts'
import * as API from '../utils/api'
import { getOrderBy, DESCENDING } from '../utils/sorting'
import { getDateString } from '../utils/date'
import FaThumbsODown from 'react-icons/lib/fa/thumbs-o-down'
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up'
import SortableTableHeaderColumn from './SortableTableHeaderColumn'
import CreateUpdatePostButtonWithDialog from './CreateUpdatePostButtonWithDialog'
import DeletePostButtonWithDialog from './DeletePostButtonWithDialog'

class PostsList extends Component {
  state = {
    orderBy: {
      property: "voteScore",
      direction: DESCENDING
    }
  }

  upVotePost = (postId) => {
    API.votePost(postId, "upVote")
      .then(post => this.props.updatePost({ post }))
  }

  downVotePost = (postId) => {
    API.votePost(postId, "downVote")
      .then(post => this.props.updatePost({ post }))
  }

  sortPosts = (property) => {
    this.setState({ orderBy: getOrderBy(property, this.state.orderBy) })
  }

  render() {
    return (
      <div className="PostsList">
        <table>
          <thead>
            <tr>
              <SortableTableHeaderColumn property="title" orderBy={this.state.orderBy} onClick={this.sortPosts}>Title</SortableTableHeaderColumn>
              <SortableTableHeaderColumn property="author" orderBy={this.state.orderBy} onClick={this.sortPosts}>Author</SortableTableHeaderColumn>
              <SortableTableHeaderColumn property="timestamp" orderBy={this.state.orderBy} onClick={this.sortPosts}>Date</SortableTableHeaderColumn>
              <SortableTableHeaderColumn property="commentCount" orderBy={this.state.orderBy} onClick={this.sortPosts}>Comments</SortableTableHeaderColumn>
              <SortableTableHeaderColumn property="voteScore" orderBy={this.state.orderBy} onClick={this.sortPosts}>Votes</SortableTableHeaderColumn>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            { this.props.posts.sort((a, b) => {
              if (this.state.orderBy.direction === DESCENDING) {
                return a[this.state.orderBy.property] < b[this.state.orderBy.property]
              }
              return a[this.state.orderBy.property] > b[this.state.orderBy.property]
            }).map(post => (
              <tr key={post.id}>
                <td><Link to={'/' + post.category + '/' + post.id}>{post.title}</Link></td>
                <td>{post.author}</td>
                <td>{getDateString(post.timestamp)}</td>
                <td>{post.commentCount}</td>
                <td>
                  <div className="vote-score">{post.voteScore}</div>
                  <button onClick={() => this.upVotePost(post.id)} className="up">
                    <FaThumbsOUp size={30}/>
                  </button>
                  <button onClick={() => this.downVotePost(post.id)} className="down">
                    <FaThumbsODown size={30}/>
                  </button>
                </td>
                <td>
                  <CreateUpdatePostButtonWithDialog post={post} />
                  <DeletePostButtonWithDialog post={post} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

function mapStateToProps ({ posts, categories }) {
  return {}
}

function mapDispatchToProps (dispatch) {
  return {
    updatePost: (data) => dispatch(updatePost(data))
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PostsList)
)
