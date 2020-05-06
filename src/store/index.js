import { createStore, combineReducers, applyMiddleware } from 'redux'
import state from './state'

const sessionStorage = JSON.parse(window.sessionStorage.getItem("state"))

export const reducer = combineReducers({ state })

const store = createStore(
    reducer,
    sessionStorage? sessionStorage : {},
    applyMiddleware()
)

store.subscribe(() => {

    const state  = store.getState();

    window.sessionStorage.setItem('state', JSON.stringify(state))
    console.log('state set')
});

export default store
