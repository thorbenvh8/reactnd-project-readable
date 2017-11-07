import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updatePost } from '../actions/posts'
import '../css/DownVotePostButton.css'
import * as API from '../utils/api'
import FaThumbsODown from 'react-icons/lib/fa/thumbs-o-down'

class DownVotePostButton extends Component {
  downVotePost = () => {
    API.votePost(this.props.postId, "downVote")
      .then(post => this.props.updatePost({ post }))
  }

  render() {
    return (
      <button onClick={this.downVotePost} className="DownVotePostButton">
        <FaThumbsODown size={20}/>
      </button>
    )
  }
}

function mapStateToProps (state, ownProps) {
}

function mapDispatchToProps (dispatch) {
  return {
    updatePost: (data) => dispatch(updatePost(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DownVotePostButton)
