import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getDateString } from '../utils/date'
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
      <div>
        <h1>Post</h1>
        { this.props.post === undefined && (<p>Post does not exist!</p>)}
        { this.props.post !== undefined && (
          <div>
            <Label title="Title" value={this.props.post.title}/>
            <Label title="Author" value={this.props.post.author}/>
            <Label title="Date" value={getDateString(this.props.post.timestamp)}/>
            <div>
              <Label title="Vote" value={this.props.post.voteScore}/>
              <UpVoteButton postId={this.props.post.id}/>
              <DownVoteButton postId={this.props.post.id}/>
            </div>
            <Label title="Body" value={this.props.post.body}/>
            <CreateUpdatePostButtonWithDialog post={this.props.post} />
            <DeletePostButtonWithDialog post={this.props.post} />
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

const Label = (props) =>
  <div>
    <label style={style.label} htmlFor={"post" + props.title}>{props.title}:</label>
    <div id={"post" + props.title}>{props.value}</div>
  </div>
