import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateComment } from '../actions/comments'
import '../css/DownVoteCommentButton.css'
import * as API from '../utils/api'
import FaThumbsODown from 'react-icons/lib/fa/thumbs-o-down'

class DownVoteCommentButton extends Component {
  downVoteComment = () => {
    API.voteComment(this.props.commentId, "downVote")
      .then(comment => this.props.updateComment({ comment }))
  }

  render() {
    return (
      <button onClick={this.downVoteComment} className="DownVoteCommentButton">
        <FaThumbsODown size={20}/>
      </button>
    )
  }
}

function mapStateToProps (state, ownProps) {
}

function mapDispatchToProps (dispatch) {
  return {
    updateComment: (data) => dispatch(updateComment(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DownVoteCommentButton)
