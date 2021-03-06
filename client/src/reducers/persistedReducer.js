import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native
import rootReducer from './rootReducer';

const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['locale']
};

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export default persistedReducer;
