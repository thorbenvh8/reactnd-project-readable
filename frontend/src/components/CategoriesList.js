import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class CategoriesList extends Component {
  render() {
    return (
      <div>
        <h1>Categories</h1>
        <ul>
          { this.props.categories.map(category => (
            <li key={category.name}><Link to={'/' + category.path}>{category.name}</Link></li>
          ))}
        </ul>
      </div>
    )
  }
}

export default CategoriesList
