import update from 'immutability-helper'

import {
  LOAD_POSTS,
  UPDATE_POST,
  CREATE_POST
} from '../actions/posts'

const initialPostsState = {
  list: []
}

function posts(state = initialPostsState, action) {
  switch (action.type) {
    case LOAD_POSTS :
      const { list } = action
      return {
        ...state,
        list
      }
    case UPDATE_POST :
      var { post } = action
      var postIndex = state.list.findIndex(function(p) {
        return p.id === post.id;
      })
      return {
        ...state,
        list: update(state.list, {
            $splice: [[postIndex, 1, post]]
        })
      }
    case CREATE_POST :
      var { post } = action
      return {
        ...state,
        list: update(state.list, {
            $push: [post]
        })
      }
    default :
      return state
  }
}

export default posts
