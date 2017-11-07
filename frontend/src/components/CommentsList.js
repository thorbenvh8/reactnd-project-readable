import React, { Component } from 'react'
import '../css/CommentsList.css'
import { DESCENDING, ASCENDING } from '../utils/sorting'
import Comment from './Comment'

class CommentsList extends Component {
  state = {
    orderBy: {
      property: "timestamp",
      direction: ASCENDING
    }
  }

  handleOrderByPropertyChange = (event) => {
    var orderBy = this.state.orderBy
    orderBy.property = event.target.value
    this.setState({ orderBy })
  }

  handleOrderByDirectionChange = (event) => {
    var orderBy = this.state.orderBy
    orderBy.direction = event.target.value
    this.setState({ orderBy })
  }

  render() {
    return (
      <div className="CommentsList">
        <div className="orderBy">
          <select value={this.state.orderBy.property} onChange={this.handleOrderByPropertyChange}>
            <option value="voteScore">Vote Score</option>
            <option value="timestamp">Date</option>
            <option value="author">Author</option>
            <option value="body">Body</option>
          </select>
          <select value={this.state.orderBy.direction} onChange={this.handleOrderByDirectionChange}>
            <option value={ASCENDING}>Asc</option>
            <option value={DESCENDING}>Desc</option>
          </select>
        </div>
        { this.props.comments.sort((a, b) => {
          if (this.state.orderBy.direction === DESCENDING) {
            return a[this.state.orderBy.property] < b[this.state.orderBy.property]
          }
          return a[this.state.orderBy.property] > b[this.state.orderBy.property]
        }).map(comment => (
          <Comment comment={comment}/>
        ))}
      </div>
    )
  }
}

export default CommentsList
