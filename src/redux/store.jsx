import { combineReducers, configureStore } from '@reduxjs/toolkit'
import studentReducer from './slices/studentSlice'
import lecturerReducer from './slices/lecturerSlice'
import authReducer from './slices/authSlice'

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    blacklist: ['lecturer', 'student', 'counter', 'auth']
}

const rootReducer = combineReducers({
    student: studentReducer,
    lecturer: lecturerReducer,
    auth: authReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export let persistor = persistStore(store)