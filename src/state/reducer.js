import { actionTypes } from "./actionTypes";
import { combineReducers } from "redux";

const initialState = {
  root: {}
};

const rootReducer = (state = initialState, action) => {
    const root = {...state.root};
    switch (action.type) {
    case actionTypes.ADD_ROOT_NAME:
      root[action.payload] = null;
      return {
        ...state,
        root: root,
      };
      case actionTypes.ADD_CHILD_NAME:
          root[Object.keys(state.root)[action.rootId]] = { [action.payload]: null}
        // root.push({ ...state.root, root: action.payload });
        return {
          ...state,
          root: root,
        };
    default:
      return { ...state };
  }
};

export default combineReducers({
  rootReducer,
});
