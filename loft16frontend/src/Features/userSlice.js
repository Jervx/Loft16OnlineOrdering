import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    hasUser : false,
    userData : null
  },
  reducers: {
    signin: (state, action) => {
      state.hasUser = true
      state.userData = action.payload
    },
    signout: (state) => {
      state.hasUser = false
      state.userData = null
    }
  },
})

// Action creators are generated for each case reducer function
export const { signin, signout } = userSlice.actions

export default userSlice.reducer