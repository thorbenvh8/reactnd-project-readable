import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPosts, fetchCategories } from '../utils/api'
import { loadPosts } from '../actions/posts'
import { loadCategories } from '../actions/categories'

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
        <h1>Posts</h1>
        <ul>
        { this.props.posts.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
        </ul>
        <h1>Categories</h1>
        <ul>
        { this.props.categories.map(category => (
          <li key={category.name}>{category.name}</li>
        ))}
        </ul>
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
