import { compose, legacy_createStore as createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const middleWares = [process.env.NODE_ENV !== 'production' && logger].filter(
    Boolean
);

const composedEnhancers = compose(applyMiddleware(...middleWares));

const persistConfig = {
    key:'root',
    storage,
    blacklist:['user']
}

const persistedReducer = persistReducer(persistConfig,rootReducer);

export const store = createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);