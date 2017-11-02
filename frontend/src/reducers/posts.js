import {
  LOAD_POSTS
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
        ...posts,
        list
      }
    default :
      return state
  }
}

export default posts
