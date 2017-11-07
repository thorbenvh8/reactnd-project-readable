import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getDateString } from '../utils/date'
import '../css/Post.css'
import CommentsList from './CommentsList'
import UpVoteButton from './UpVoteButton'
import DownVoteButton from './DownVoteButton'
import CreateUpdatePostButtonWithDialog from './CreateUpdatePostButtonWithDialog'
import DeletePostButtonWithDialog from './DeletePostButtonWithDialog'
import CreateComment from './CreateComment'

const style = {
  label: {
    "float": "left",
    "marginRight": "5px"
  }
}

class Post extends Component {
  render() {
    return (
      <div className="Post">
        { this.props.post === undefined && (<p>Post does not exist!</p>)}
        { this.props.post !== undefined && (
          <div>
            <div className="post">
              <h1>{this.props.post.title}</h1>
              <div className="vote">
                <div>{this.props.post.voteScore}</div>
                <UpVoteButton postId={this.props.post.id}/>
                <DownVoteButton postId={this.props.post.id}/>
              </div>
              <div className="author">
                by {this.props.post.author} ({getDateString(this.props.post.timestamp)})
                <CreateUpdatePostButtonWithDialog post={this.props.post} />
                <DeletePostButtonWithDialog post={this.props.post} />
              </div>
              <div className="body">{this.props.post.body}</div>
            </div>
            <CommentsList comments={this.props.comments}/>
            <CreateComment postId={this.props.post.id}/>
          </div>
        )}
      </div>
    )
  }
}

function mapStateToProps ({ posts, comments, categories }, ownProps) {
  var post = posts.list.find(post => post.id === ownProps.match.params.postId)
  return {
    post,
    comments: comments[ownProps.match.params.postId] ? comments[ownProps.match.params.postId] : []
  }
}

function mapDispatchToProps (dispatch) {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post)
