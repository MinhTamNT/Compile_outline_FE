import {
  configureStore,
  combineReducers,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./userSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["auth", "user"],
};
const combinedReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "logout/LOGOUT") {
    return combinedReducer(undefined, action);
  }
  return combinedReducer(state, action);
};

export const logout = createAsyncThunk(
  "auth/logout",
  async function (_payload, thunkAPI) {
    thunkAPI.dispatch({ type: "logout/LOGOUT" });
  }
);

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);

export default store;
