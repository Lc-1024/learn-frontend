import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  {id: '0', name: 'lc'},
  {id: '1', name: 'as'},
  {id: '2', name: 'df'},
]

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
})

export default usersSlice.reducer;