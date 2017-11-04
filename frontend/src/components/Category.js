import React, { Component } from 'react'
import { connect } from 'react-redux'
import PostsList from './PostsList'

class Categorie extends Component {
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
    posts: posts.list.filter(post => post.category === ownProps.match.params.category)
  }
}

function mapDispatchToProps (dispatch) {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Categorie)
