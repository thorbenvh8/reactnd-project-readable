import update from 'immutability-helper'

import {
  LOAD_POSTS,
  UPDATE_POST
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
      const { post } = action
      var postIndex = state.list.findIndex(function(p) {
        return p.id === post.id;
      })
      return {
        ...state,
        list: update(state.list, {
            $splice: [[postIndex, 1, post]]
        })
      }
    default :
      return state
  }
}

export default posts
