import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Switch, Route, Link } from 'react-router-dom'
import '../css/App.css'
import * as API from '../utils/api'
import { loadPosts } from '../actions/posts'
import { addComments } from '../actions/comments'
import { loadCategories } from '../actions/categories'
import CategoriesNav from './CategoriesNav'
import Main from './Main'
import Category from './Category'
import Post from './Post'

class App extends Component {
  componentDidMount() {
    API.fetchPosts()
    .then(
      posts => {
        this.props.loadPosts({ posts })
        for (var i in posts) {
          var postId = posts[i].id
          API.fetchComments(postId).then(({ postId, comments }) => {
            this.props.addComments({postId, comments})
          })
        }
      }
    )

    API.fetchCategories()
    .then(
      categories => {
        this.props.loadCategories({ categories })
      }
    )
  }

  render() {
    return (
      <div className="App">
        <section className="nav">
          <div className="home">
            <Link to="/">Readable</Link>
          </div>
          <Switch>
            <Route exact path="/" component={CategoriesNav}/>
            <Route path="/:category" component={CategoriesNav}/>
          </Switch>
        </section>
        <Switch>
          <Route exact path="/" component={Main}/>
          <Route exact path='/:category' component={Category}/>
          <Route exact path='/:category/:postId' component={Post}/>
        </Switch>
      </div>
    )
  }
}

function mapStateToProps ({ categories }, ownProps) {
  return {
    categories: categories.list
  }
}

function mapDispatchToProps (dispatch) {
  return {
    loadPosts: (data) => dispatch(loadPosts(data)),
    addComments: (data) => dispatch(addComments(data)),
    loadCategories: (data) => dispatch(loadCategories(data))
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
)
