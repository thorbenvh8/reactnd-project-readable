export const ADD_COMMENTS = 'ADD_COMMENTS'
export const CREATE_COMMENT = 'CREATE_COMMENT'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'

export function addComments({ postId, comments }) {
  return {
    type: ADD_COMMENTS,
    postId,
    comments
  }
}

export function createComment({ comment }) {
  return {
    type: CREATE_COMMENT,
    comment
  }
}

export function updateComment({ comment }) {
  return {
    type: UPDATE_COMMENT,
    comment
  }
}

export function deleteComment({ comment }) {
  return {
    type: DELETE_COMMENT,
    comment
  }
}
