import { createSlice } from '@reduxjs/toolkit'
import { sub } from 'date-fns'

const initialState = [
  { 
    id: "1", 
    date: sub(new Date(), {minutes : 1}).toISOString(),
    title: "first article", 
    content: "hello", 
    user: '0',
    reactions: {thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0},
  },
  { 
    id: "2", 
    date: sub(new Date(), {minutes : 0}).toISOString(),
    title: "second post", 
    content: "more next", 
    user: '0',
    reactions: {thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0},
  },
]

const postsSlice = createSlice ({
  name: "posts",
  initialState,
  reducers: {
    // 这是在posts内部，所以state就是posts
    postAdded: {
      reducer(state, action) {
        state.push(action.payload)
      },
      prepare(id, title, content, user) {
        return {
          payload: {
            id,
            date: new Date().toISOString(),
            title,
            content,
            user,
            reactions: {thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0},
          }
        }
      },
    },
    postUpdated: (state, action) => {
      const {id, title, content} = action.payload
      const existingPost = state.find(post => post.id === id)
      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
      }
    },
    reactionAdded: (state, action) => {
      const { postId, reaction } = action.payload
      const existingPost = state.find(post => post.id === postId)
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    }
  },
})

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions

export default postsSlice.reducer;
