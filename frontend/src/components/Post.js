import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getDateString } from '../utils/date'
import { updatePost } from '../actions/posts'
import * as API from '../utils/api'
import CommentsList from './CommentsList'
import FaThumbsODown from 'react-icons/lib/fa/thumbs-o-down'
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up'
import CreateUpdatePostButtonWithDialog from './CreateUpdatePostButtonWithDialog'

const style = {
  label: {
    "float": "left",
    "marginRight": "5px"
  }
}

class Post extends Component {
  upVotePost = (postId) => {
    API.votePost(postId, "upVote")
      .then(post => this.props.updatePost({ post }))
  }

  downVotePost = (postId) => {
    API.votePost(postId, "downVote")
      .then(post => this.props.updatePost({ post }))
  }

  render() {
    return (
      <div>
        <h1>Post</h1>
        <Label title="Title" value={this.props.post.title}/>
        <Label title="Author" value={this.props.post.author}/>
        <Label title="Date" value={getDateString(this.props.post.timestamp)}/>
        <div>
          <Label title="Vote" value={this.props.post.voteScore}/>
          <button onClick={() => this.upVotePost(this.props.post.id)} className='icon-btn'>
            <FaThumbsOUp size={30}/>
          </button>
          <button onClick={() => this.downVotePost(this.props.post.id)} className='icon-btn'>
            <FaThumbsODown size={30}/>
          </button>
        </div>
        <Label title="Body" value={this.props.post.body}/>
        <CreateUpdatePostButtonWithDialog post={this.props.post} />
        <CommentsList comments={this.props.comments}/>
      </div>
    )
  }
}

function mapStateToProps ({ posts, comments, categories }, ownProps) {
  var post = posts.list.find(post => post.id === ownProps.match.params.postId) ? posts.list.find(post => post.id === ownProps.match.params.postId) : {}
  return {
    post,
    comments: comments[post.id] ? comments[post.id] : []
  }
}

function mapDispatchToProps (dispatch) {
  return {
    updatePost: (data) => dispatch(updatePost(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post)

const Label = (props) =>
  <div>
    <label style={style.label} htmlFor={"post" + props.title}>{props.title}:</label>
    <div id={"post" + props.title}>{props.value}</div>
  </div>
