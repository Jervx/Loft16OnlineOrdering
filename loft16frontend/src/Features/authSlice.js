import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    registration : {},
    signin : {}
  },
  reducers: {
    partialRegistration : (state, action) => {
      state.registration = action.payload
    },
    finalRegistration : (state, action) => {
      state.registration = {
          ...state.registration,
          confirmation_code : action.payload.confirmation_code
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const { signin, signout, partialRegistration, finalRegistration } = authSlice.actions

export default authSlice.reducer