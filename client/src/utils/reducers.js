import { useReducer } from 'react';
import {
  ADD_PROJECTS,
  DELETE_PROJECTS,
  GET_PROJECTS
} from './actions';

export const reducer = (state, action) => {
  switch (action.type) {
    case GET_PROJECTS:
      return {
        ...state,
        projects: [...action.projects],
      };

    case ADD_PROJECTS:
      return {
        ...state,
        projects: [...state.projects, action.projects],
      };

    case DELETE_PROJECTS:
      let newState = state.projects.filter((project) => {
        return project._id !== project._id;
      });

      return {
        ...state,
        projects: newState,
      };

    // case CLEAR_CART:
    //   return {
    //     ...state,
    //     cartOpen: false,
    //     cart: [],
    //   };

    // case TOGGLE_CART:
    //   return {
    //     ...state,
    //     cartOpen: !state.cartOpen,
    //   };

    // case UPDATE_CATEGORIES:
    //   return {
    //     ...state,
    //     categories: [...action.categories],
    //   };

    // case UPDATE_CURRENT_CATEGORY:
    //   return {
    //     ...state,
    //     currentCategory: action.currentCategory,
    //   };

    // Return the state as is in the event that the `action.type` passed to our reducer was not accounted for by the developers
    // This saves us from a crash.
    default:
      return state;
  }
};

export function useProjectReducer(initialState) {
  return useReducer(reducer, initialState);
}
