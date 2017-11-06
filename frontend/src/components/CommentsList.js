import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateComment } from '../actions/comments'
import * as API from '../utils/api'
import { getOrderBy, DESCENDING } from '../utils/sorting'
import { getDateString } from '../utils/date'
import FaThumbsODown from 'react-icons/lib/fa/thumbs-o-down'
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up'
import SortableTableHeaderColumn from './SortableTableHeaderColumn'
import UpdateCommentButtonWithDialog from './UpdateCommentButtonWithDialog'
import DeleteCommentButtonWithDialog from './DeleteCommentButtonWithDialog'

class CommentsList extends Component {
  state = {
    orderBy: {
      property: "voteScore",
      direction: DESCENDING
    }
  }

  upVoteComment = (commentId) => {
    API.voteComment(commentId, "upVote")
      .then(comment => this.props.updateComment({ comment }))
  }

  downVoteComment = (commentId) => {
    API.voteComment(commentId, "downVote")
      .then(comment => this.props.updateComment({ comment }))
  }

  sortComments = (property) => {
    this.setState({ orderBy: getOrderBy(property, this.state.orderBy) })
  }

  render() {
    return (
      <div>
        <h1>Comments</h1>
        <table>
          <thead>
            <tr>
              <SortableTableHeaderColumn property="body" orderBy={this.state.orderBy} onClick={this.sortComments}>Body</SortableTableHeaderColumn>
              <SortableTableHeaderColumn property="author" orderBy={this.state.orderBy} onClick={this.sortComments}>Author</SortableTableHeaderColumn>
              <SortableTableHeaderColumn property="timestamp" orderBy={this.state.orderBy} onClick={this.sortComments}>Date</SortableTableHeaderColumn>
              <SortableTableHeaderColumn colSpan="2" property="voteScore" orderBy={this.state.orderBy} onClick={this.sortComments}>Votes</SortableTableHeaderColumn>
              <th></th>
            </tr>
          </thead>
          <tbody>
            { this.props.comments.sort((a, b) => {
              if (this.state.orderBy.direction === DESCENDING) {
                return a[this.state.orderBy.property] < b[this.state.orderBy.property]
              }
              return a[this.state.orderBy.property] > b[this.state.orderBy.property]
            }).map(comment => (
              <tr key={comment.id}>
                <td>{comment.body}</td>
                <td>{comment.author}</td>
                <td>{getDateString(comment.timestamp)}</td>
                <td>{comment.voteScore}</td>
                <td>
                  <button onClick={() => this.upVoteComment(comment.id)} className='icon-btn'>
                    <FaThumbsOUp size={30}/>
                  </button>
                  <button onClick={() => this.downVoteComment(comment.id)} className='icon-btn'>
                    <FaThumbsODown size={30}/>
                  </button>
                </td>
                <td>
                  <UpdateCommentButtonWithDialog comment={comment}/>
                  <DeleteCommentButtonWithDialog comment={comment}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

function mapStateToProps ({ comments, categories }) {
  return {}
}

function mapDispatchToProps (dispatch) {
  return {
    updateComment: (data) => dispatch(updateComment(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentsList)
