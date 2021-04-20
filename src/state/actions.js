import { actionTypes } from "./actionTypes";

export const addRoot = (data, id) => {
  return {
    type: actionTypes.ADD_ROOT_NAME,
    payload: data,
    id: id
  };
};

export const addChild = (data, childId, rootId) => {
    return {
      type: actionTypes.ADD_CHILD_NAME,
      payload: data,
      childId: childId,
      rootId: rootId
    };
  };
