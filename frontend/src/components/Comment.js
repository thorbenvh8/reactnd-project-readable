import React, { Component } from 'react'
import '../css/Comment.css'
import { getDateString } from '../utils/date'
import UpdateCommentButtonWithDialog from './UpdateCommentButtonWithDialog'
import DeleteCommentButtonWithDialog from './DeleteCommentButtonWithDialog'
import UpVoteCommentButton from './UpVoteCommentButton'
import DownVoteCommentButton from './DownVoteCommentButton'

class Comment extends Component {

  render() {
    return (
      <div className="Comment">
        <div className="body">{this.props.comment.body}</div>
        <div className="vote">
          <div>{this.props.comment.voteScore}</div>
          <UpVoteCommentButton commentId={this.props.comment.id}/>
          <DownVoteCommentButton commentId={this.props.comment.id}/>
        </div>
        <div className="author">
          by {this.props.comment.author} ({getDateString(this.props.comment.timestamp)})
          <UpdateCommentButtonWithDialog comment={this.props.comment}/>
          <DeleteCommentButtonWithDialog comment={this.props.comment}/>
        </div>
      </div>
    )
  }
}

export default Comment
