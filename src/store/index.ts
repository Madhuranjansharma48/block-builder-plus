import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import builderReducer from './builderSlice';

const persistConfig = {
  key: 'page-builder',
  storage,
  whitelist: ['layout', 'history', 'historyIndex'] // Only persist these fields
};

const persistedReducer = persistReducer(persistConfig, builderReducer);

// Autosave middleware
const autosaveMiddleware = (store: any) => (next: any) => (action: any) => {
  const result = next(action);
  
  // Autosave after certain actions
  const autosaveActions = [
    'builder/addComponent',
    'builder/reorderComponents', 
    'builder/removeComponent',
    'builder/updateComponent'
  ];
  
  if (autosaveActions.includes(action.type)) {
    // Simulate autosave with a delay
    setTimeout(() => {
      store.dispatch({ type: 'builder/updateLastSaved' });
    }, 1000);
  }
  
  return result;
};

export const store = configureStore({
  reducer: {
    builder: persistedReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
      }
    }).concat(autosaveMiddleware)
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;