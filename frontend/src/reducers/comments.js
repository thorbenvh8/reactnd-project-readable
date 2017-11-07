import update from 'immutability-helper'

import {
  ADD_COMMENTS,
  CREATE_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT
} from '../actions/comments'

const initialCommentsState = {}

function comments(state = initialCommentsState, action) {
  switch (action.type) {
    case ADD_COMMENTS :
      return addCommentState(state, action)
    case CREATE_COMMENT :
      return createCommentState(state, action)
    case UPDATE_COMMENT :
      return updateCommentState(state, action)
    case DELETE_COMMENT :
      return deleteCommentState(state, action)
    default :
      return state
  }
}

function addCommentState(state, action) {
  const { postId, comments } = action
  return {
    ...state,
    [postId]: comments.filter(comment => !comment.deleted)
  }
}

function createCommentState(state, action) {
  var { comment } = action
  return {
    ...state,
    [comment.parentId]:  update(state[comment.parentId], {
        $push: [comment]
    })
  }
}

function updateCommentState(state, action) {
  var { comment } = action
  var commentIndex = state[comment.parentId].findIndex(function(c) {
    return c.id === comment.id;
  })
  return {
    ...state,
    [comment.parentId]:  update(state[comment.parentId], {
        $splice: [[commentIndex, 1, comment]]
    })
  }
}

function deleteCommentState(state, action) {
  var { comment } = action
  var commentIndex = state[comment.parentId].findIndex(function(c) {
    return c.id === comment.id;
  })
  return {
    ...state,
    [comment.parentId]:  update(state[comment.parentId], {
        $splice: [[commentIndex, 1]]
    })
  }
}

export default comments
