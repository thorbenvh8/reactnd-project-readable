import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import '../css/CategoriesNav.css'

class CategoriesNav extends Component {
  render() {
    return (
      <nav className="CategoriesNav">
        <ul>
          { this.props.categories.map(category => (
            <li key={category.name}>
              <Link to={'/' + category.path} className={category.className}>
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    )
  }
}

function mapStateToProps ({ categories }, ownProps) {
  return {
    categories: categories.list.map(category => {
      return {
        ...category,
        className: ownProps.match.params.category === category.name ? "selected" : ""
      }
    })
  }
}

function mapDispatchToProps (dispatch) {
  return {}
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CategoriesNav)
)
