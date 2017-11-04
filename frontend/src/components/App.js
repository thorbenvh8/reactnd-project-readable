import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Switch, Route, Link } from 'react-router-dom'
import { fetchPosts, fetchCategories } from '../utils/api'
import { loadPosts } from '../actions/posts'
import { loadCategories } from '../actions/categories'
import CategoriesList from './CategoriesList'
import Main from './Main'
import Category from './Category'

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
        <Link to="/">Readable</Link>
        <CategoriesList categories={this.props.categories}/>
        <Switch>
          <Route exact path="/" component={Main}/>
          <Route exact path='/:category' component={Category}/>
        </Switch>
      </div>
    )
  }
}

function mapStateToProps ({ posts, categories }, ownProps) {
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

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
)
