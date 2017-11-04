import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getDateString } from '../utils/date'
import CommentsList from './CommentsList'

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
        <Label title="Title" value={this.props.post.title}/>
        <Label title="Author" value={this.props.post.author}/>
        <Label title="Date" value={getDateString(this.props.post.timestamp)}/>
        <Label title="Vote" value={this.props.post.voteScore}/>
        <Label title="Body" value={this.props.post.body}/>
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
