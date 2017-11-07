import update from 'immutability-helper'

import {
  LOAD_POSTS,
  UPDATE_POST,
  CREATE_POST,
  DELETE_POST
} from '../actions/posts'

const initialPostsState = {
  list: []
}

function posts(state = initialPostsState, action) {
  switch (action.type) {
    case LOAD_POSTS :
      return loadPostsState(state, action)
    case UPDATE_POST :
      return updatePostState(state, action)
    case CREATE_POST :
      return createPostState(state, action)
    case DELETE_POST :
      return deletePostState(state, action)
    default :
      return state
  }
}

function loadPostsState(state, action) {
  const { list } = action
  return {
    ...state,
    list: list.filter(post => !post.deleted)
  }
}

function updatePostState(state, action) {
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
}

function createPostState(state, action) {
  var { post } = action
  return {
    ...state,
    list: update(state.list, {
        $push: [post]
    })
  }
}

function deletePostState(state, action) {
  var { postId } = action
  var postIndex = state.list.findIndex(function(p) {
    return p.id === postId;
  })
  return {
    ...state,
    list: update(state.list, {
        $splice: [[postIndex, 1]]
    })
  }
}

export default posts
