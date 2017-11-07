import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../css/Main.css'
import PostsList from './PostsList'
import CreateUpdatePostButtonWithDialog from './CreateUpdatePostButtonWithDialog'

class Main extends Component {
  render() {
    return (
      <div className="Main">
        <div className="create">
          <CreateUpdatePostButtonWithDialog />
        </div>
        <PostsList posts={this.props.posts}/>
      </div>
    )
  }
}

function mapStateToProps ({ posts, categories }, ownProps) {
  return {
    posts: posts
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
