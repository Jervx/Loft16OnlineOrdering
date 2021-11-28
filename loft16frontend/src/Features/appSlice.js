import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
  name: 'app',
  initialState: {
     appState: {
       userSearch : '',
       filter : '',
       data : []
     }
    },
  reducers: {
    
  },
})

// Action creators are generated for each case reducer function
// export const { signin, signout } = userSlice.actions

export default appSlice.reducer