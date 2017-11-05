import React, { Component } from 'react'
import { connect } from 'react-redux'
import PostsList from './PostsList'
import CreateUpdatePostButtonWithDialog from './CreateUpdatePostButtonWithDialog'

class Categorie extends Component {
  render() {
    return (
      <div>
        <PostsList posts={this.props.posts}/>
        <CreateUpdatePostButtonWithDialog category={this.props.category} />
      </div>
    )
  }
}

function mapStateToProps ({ posts, categories }, ownProps) {
  return {
    posts: posts.list.filter(post => post.category === ownProps.match.params.category),
    category: ownProps.match.params.category
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
