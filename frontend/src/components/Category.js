import React, { Component } from 'react'
import { connect } from 'react-redux'
import PostsList from './PostsList'
import CreateUpdatePostButtonWithDialog from './CreateUpdatePostButtonWithDialog'
import '../css/Category.css'

class Categorie extends Component {
  render() {
    return (
      <div className="Category">
        <div className="create">
          <CreateUpdatePostButtonWithDialog category={this.props.category} />
        </div>
        <PostsList posts={this.props.posts}/>
      </div>
    )
  }
}

function mapStateToProps ({ posts, categories }, ownProps) {
  return {
    posts: posts.filter(post => post.category === ownProps.match.params.category),
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
