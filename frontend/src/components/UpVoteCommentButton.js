import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateComment } from '../actions/comments'
import '../css/UpVoteCommentButton.css'
import * as API from '../utils/api'
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up'

class UpVoteCommentButton extends Component {
  upVoteComment = () => {
    API.voteComment(this.props.commentId, "upVote")
      .then(comment => this.props.updateComment({ comment }))
  }

  render() {
    return (
      <button onClick={this.upVoteComment} className="UpVoteCommentButton">
        <FaThumbsOUp size={20}/>
      </button>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpVoteCommentButton)
