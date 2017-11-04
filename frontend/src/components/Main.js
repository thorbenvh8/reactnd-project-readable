import React, { Component } from 'react'
import { connect } from 'react-redux'
import PostsList from './PostsList'

class Main extends Component {
  render() {
    return (
      <div>
        <PostsList posts={this.props.posts}/>
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
