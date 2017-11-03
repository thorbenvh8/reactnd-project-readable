import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPosts, fetchCategories } from '../utils/api'
import { loadPosts } from '../actions/posts'
import { loadCategories } from '../actions/categories'
import PostsList from './PostsList'
import CategoriesList from './CategoriesList'

class App extends Component {
  componentDidMount() {
    fetchPosts()
    .then(
      posts => {
        this.props.loadPosts({ posts })
      }
    )

    fetchCategories()
    .then(
      categories => {
        this.props.loadCategories({ categories })
      }
    )
  }

  render() {
    return (
      <div className="App">
        <PostsList posts={this.props.posts}/>
        <CategoriesList categories={this.props.categories}/>
      </div>
    )
  }
}

function mapStateToProps ({ posts, categories }) {
  return {
    posts: posts.list,
    categories: categories.list
  }
}

function mapDispatchToProps (dispatch) {
  return {
    loadPosts: (data) => dispatch(loadPosts(data)),
    loadCategories: (data) => dispatch(loadCategories(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
