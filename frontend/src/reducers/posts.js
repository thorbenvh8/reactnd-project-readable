import update from 'immutability-helper'

import {
  LOAD_POSTS,
  UPDATE_POST,
  CREATE_POST,
  DELETE_POST
} from '../actions/posts'

const initialPostsState = []

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
  const { posts } = action
  return posts.filter(post => !post.deleted)
}

function updatePostState(state, action) {
  var { post } = action
  var postIndex = state.findIndex(function(p) {
    return p.id === post.id;
  })
  return update(state, {
    $splice: [[postIndex, 1, post]]
  })
}

function createPostState(state, action) {
  var { post } = action
  return update(state, {
    $push: [post]
  })
}

function deletePostState(state, action) {
  var { postId } = action
  var postIndex = state.findIndex(function(p) {
    return p.id === postId;
  })
  return update(state, {
    $splice: [[postIndex, 1]]
  })
}

export default posts
