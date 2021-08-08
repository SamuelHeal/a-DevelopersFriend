import { useReducer } from 'react';
import {
  ADD_PROJECTS,
  DELETE_PROJECTS,
  GET_PROJECTS
} from './actions';

export const reducer = (state, action) => {
  switch (action.type) {
    case GET_PROJECTS:
        console.log(action)

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

    default:
      return state;
  }
};

export function useProjectReducer(initialState) {
  return useReducer(reducer, initialState);
}
