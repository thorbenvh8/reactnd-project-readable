import React, { Component } from 'react'
import { connect } from 'react-redux'
import PostsList from './PostsList'
import CreateUpdatePostButtonWithDialog from './CreateUpdatePostButtonWithDialog'

class Main extends Component {
  render() {
    return (
      <div>
        <PostsList posts={this.props.posts}/>
        <CreateUpdatePostButtonWithDialog />
      </div>
    )
  }
}

function mapStateToProps ({ posts, categories }, ownProps) {
  return {
    posts: posts.list
  }
}

function mapDispatchToProps (dispatch) {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)
