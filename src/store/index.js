import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import authReducer from 'containers/shared/Auth/module/reducer';
import userInfoReducer from 'containers/clients/UserInfo/module/reducer';
import movieReducer from 'containers/admin/Movie/module/reducer';
import editMovieReducer from 'containers/admin/Movie/EditMovie/module/reducer'
import bookTicketReducer from 'containers/clients/Seat-Plan/module/reducer';
import movieListReducer from 'containers/clients/Home/module/reducer';
import movieDetailReducer from 'containers/clients/MovieDetails/module/reducer';
const rootReducer = combineReducers({
  authReducer,
  userInfoReducer,
  movieReducer,
  editMovieReducer,
  bookTicketReducer,
  movieListReducer,
  movieDetailReducer
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['authReducer','userInfoReducer','editMovieReducer']
}

const persistedReducer = persistReducer(persistConfig,rootReducer);

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

const persistor = persistStore(store)

export  {store,persistor};
