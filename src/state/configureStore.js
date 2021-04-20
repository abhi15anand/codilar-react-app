import combinedReducer from "./reducer";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { addChild, addRoot } from "./actions";

export const addRootDispatcher = (data, id) => {
  return function (dispatch) {
    dispatch(addRoot(data, id));
  };
};

export const addChildDispatcher = (data, childId, rootId) => {
    return function (dispatch) {
      dispatch(addChild(data, childId, rootId));
    };
  };

export default function configureStore() {
  return createStore(combinedReducer, applyMiddleware(thunk));
}
