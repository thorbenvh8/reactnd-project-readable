import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updatePost } from '../actions/posts'
import '../css/UpVotePostButton.css'
import * as API from '../utils/api'
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up'

class UpVotePostButton extends Component {
  upVotePost = () => {
    API.votePost(this.props.postId, "upVote")
      .then(post => this.props.updatePost({ post }))
  }

  render() {
    return (
      <button onClick={this.upVotePost} className="UpVotePostButton">
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
    updatePost: (data) => dispatch(updatePost(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpVotePostButton)
