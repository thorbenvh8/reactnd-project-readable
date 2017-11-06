const api = "http://localhost:3001"

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export function fetchPosts () {
  return fetch(`${api}/posts`, { headers })
    .then((res) => res.json())
}

export function votePost (postId, option) {
  return fetch(
    `${api}/posts/${postId}`,
    {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ option })
    }
  )
    .then((res) => res.json())
}

export function createPost (post) {
  return fetch(
    `${api}/posts`,
    {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: post.title,
        author: post.author,
        category: post.category,
        body: post.body
      })
    }
  )
    .then((res) => res.json())
}

export function updatePost (postId, post) {
  return fetch(
    `${api}/posts/${postId}`,
    {
      method: 'PUT',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: post.title,
        author: post.author,
        category: post.category,
        body: post.body
      })
    }
  )
    .then((res) => res.json())
}

export function deletePost (postId) {
  return fetch(
    `${api}/posts/${postId}`,
    {
      method: 'DELETE',
      headers: {
        ...headers
      }
    }
  )
    .then((res) => res.json())
}

export function fetchComments (postId) {
  return fetch(`${api}/posts/${postId}/comments`, { headers })
    .then((res) => res.json())
    .then((comments) => {
        return { postId, comments }
    })
}

export function voteComment (commentId, option) {
  return fetch(
    `${api}/comments/${commentId}`,
    {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ option })
    }
  )
    .then((res) => res.json())
}

export function updateComment (commentId, comment) {
  return fetch(
    `${api}/comments/${commentId}`,
    {
      method: 'PUT',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        body: comment.body,
        author: comment.author
      })
    }
  )
    .then((res) => res.json())
}

export function fetchCategories () {
  return fetch(`${api}/categories`, { headers })
    .then((res) => res.json())
}
