
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from './reducers'

const initialState = {}

const middleware = [thunk]

const persistConfig = {
    // Root
    key: 'root',
    // Storage Method (React Native)
    storage: storage,
    // Whitelist (Save Specific Reducers)
    whitelist: [
      'auth',
    ]
  }

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(
    persistedReducer,
    initialState,
    applyMiddleware(
      ...middleware,
    ),
  )

let persistor = persistStore(store)

export {
    store,
    persistor,
  }

