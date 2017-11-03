import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { updatePost } from '../actions/posts'
import { votePost } from '../utils/api'
import { getOrderBy, DESCENDING } from '../utils/sorting'
import FaThumbsODown from 'react-icons/lib/fa/thumbs-o-down'
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up'
import FaSortAsc from 'react-icons/lib/fa/sort-asc'
import FaSortDesc from 'react-icons/lib/fa/sort-desc'

class PostsList extends Component {
  state = {
    orderBy: {
      property: "voteScore",
      direction: DESCENDING
    }
  }

  upVotePost = (postId) => {
    votePost(postId, "upVote")
      .then(post => this.props.updatePost({ post }))
  }

  downVotePost = (postId) => {
    votePost(postId, "downVote")
      .then(post => this.props.updatePost({ post }))
  }

  sortPosts = (property) => {
    this.setState({ orderBy: getOrderBy(property, this.state.orderBy) })
  }

  render() {
    return (
      <div>
        <h1>Posts</h1>
        <table>
          <thead>
            <tr>
              <SortableTableHeaderColumn property="title" orderBy={this.state.orderBy} onClick={this.sortPosts}>Title</SortableTableHeaderColumn>
              <SortableTableHeaderColumn property="author" orderBy={this.state.orderBy} onClick={this.sortPosts}>Author</SortableTableHeaderColumn>
              <SortableTableHeaderColumn property="commentCount" orderBy={this.state.orderBy} onClick={this.sortPosts}>Comments</SortableTableHeaderColumn>
              <SortableTableHeaderColumn colSpan="2" property="voteScore" orderBy={this.state.orderBy} onClick={this.sortPosts}>Votes</SortableTableHeaderColumn>
              <th></th>
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
                <td>{post.commentCount}</td>
                <td>{post.voteScore}</td>
                <td>
                  <button onClick={() => this.upVotePost(post.id)} className='icon-btn'>
                    <FaThumbsOUp size={30}/>
                  </button>
                  <button onClick={() => this.downVotePost(post.id)} className='icon-btn'>
                    <FaThumbsODown size={30}/>
                  </button>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostsList)

const SortableTableHeaderColumn = (props) =>
  <th colSpan={ props.colSpan ? props.colSpan : 1} onClick={() => props.onClick(props.property)}>
    { props.children }
    { props.orderBy.property === props.property &&
      (
        props.orderBy.direction === DESCENDING ?
        <FaSortDesc size={18}/> :
        <FaSortAsc size={18}/>
      )
    }
  </th>
