import { configureStore } from '@reduxjs/toolkit'
import userReducer from "../Features/userSlice"
import appReducer from "../Features/appSlice"
import uiReducer from "../Features/uiSlice"
import authReducer from '../Features/authSlice'

export default configureStore({
  reducer: {
    user:userReducer,
    app:appReducer,
    ui: uiReducer,
    auth : authReducer
  },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false //{
        // Ignore these action types
        //ignoredActions: [userReducer, appReducer, uiReducer, authReducer],
        // Ignore these field paths in all actions
        //ignoredActionPaths: [ 'ui.notifier.onAccept'],
        // Ignore these paths in the state
        //ignoredPaths: ['ui.notifier.onAccept'],
      //},
    })
})