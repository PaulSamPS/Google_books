import {applyMiddleware, createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import {combineReducers} from 'redux'
import thunk from 'redux-thunk'
import apiReducer from './reducers/apiReducer'

export const rootReducer = combineReducers({
    api: apiReducer
})

export const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)))

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch