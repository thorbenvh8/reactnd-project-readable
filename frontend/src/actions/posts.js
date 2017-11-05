export const LOAD_POSTS = 'LOAD_POSTS'
export const UPDATE_POST = 'UPDATE_POST'
export const CREATE_POST = 'CREATE_POST'

export function loadPosts({ posts }) {
  return {
    type: LOAD_POSTS,
    list: posts
  }
}

export function updatePost({ post }) {
  return {
    type: UPDATE_POST,
    post
  }
}

export function createPost({ post }) {
  return {
    type: CREATE_POST,
    post
  }
}
