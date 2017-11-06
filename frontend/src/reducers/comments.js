import update from 'immutability-helper'

import {
  ADD_COMMENTS,
  UPDATE_COMMENT,
  DELETE_COMMENT
} from '../actions/comments'

const initialCommentsState = {}

function comments(state = initialCommentsState, action) {
  switch (action.type) {
    case ADD_COMMENTS :
      const { postId, comments } = action
      return {
        ...state,
        [postId]: comments.filter(comment => !comment.deleted)
      }
    case UPDATE_COMMENT :
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
    case DELETE_COMMENT :
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
    default :
      return state
  }
}

export default comments
