import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
  name: 'app',
  initialState: {
     appState: {
       userSearch : '',
       filter : {
           max : 50,
           scope : 'all',
           availability : 'all',
           sortBy : 'all'
       },
       data : []
     }
    },
  reducers: {
    setUserSearch: (state, action) => { 
        if(!action.payload.userSearch){
            state.appState.userSearch = ""
            return
        }
        state.appState.userSearch = action.payload.userSearch.replace(/[^\w\s\[\\]]/gi, '')
    },
    setFilter : (state, action) => {
        console.log("NEW FILTER",action.payload.filter)
        state.appState.filter = action.payload.filter
    },
    setData : (state, action) =>{
        state.appState.data = action.payload.data
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUserSearch, setFilter, setData } = appSlice.actions

export default appSlice.reducer