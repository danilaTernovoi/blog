import { applyMiddleware, combineReducers, createStore } from "redux";
import { FC } from "react";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import auth from "./auth";
import modal from "./modal";
import articles from "./articles";

const rootReducer = combineReducers({ auth, modal, articles });

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export type RootState = ReturnType<typeof store.getState>;

export const StoreProvider: FC = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);
