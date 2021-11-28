import { configureStore } from '@reduxjs/toolkit'
import userReducer from "../Features/userSlice"
import appReducer from "../Features/appSlice"
import uiReducer from "../Features/uiSlice"
import authReducer from '../Features/authSlice'

console.log(userReducer)

export default configureStore({
  reducer: {
    user:userReducer,
    app:appReducer,
    ui: uiReducer,
    auth : authReducer
  },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['UI/openLoader','UI/closeAlertModal', 'UI/closeLoader'],
        // Ignore these field paths in all actions
        //ignoredActionPaths: [ 'payload.component.$$typeof','payload.component.type','ui.inputModal.onAccept'],
        // Ignore these paths in the state
        //ignoredPaths: ['ui.notifier.onAccept','ui.inputModal.component.type','ui.inputModal.onAccep','ui.inputModal.component.$$typeof'],
      },
    })
})