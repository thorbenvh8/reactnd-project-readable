import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../css/PostsList.css'
import { getOrderBy, DESCENDING } from '../utils/sorting'
import { getDateString } from '../utils/date'
import SortableTableHeaderColumn from './SortableTableHeaderColumn'
import UpVotePostButton from './UpVotePostButton'
import DownVotePostButton from './DownVotePostButton'
import CreateUpdatePostButtonWithDialog from './CreateUpdatePostButtonWithDialog'
import DeletePostButtonWithDialog from './DeletePostButtonWithDialog'

class PostsList extends Component {
  state = {
    orderBy: {
      property: "voteScore",
      direction: DESCENDING
    }
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
                <td><Link to={'/' + post.category + '/' + post.id} className="post">{post.title}</Link></td>
                <td>{post.author}</td>
                <td>{getDateString(post.timestamp)}</td>
                <td>{post.commentCount}</td>
                <td>
                  <div className="vote-score">{post.voteScore}</div>
                  <UpVotePostButton postId={post.id}/>
                  <DownVotePostButton postId={post.id}/>
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

export default PostsList
