import {createSlice} from "@reduxjs/toolkit";
import professionService from "../services/profession.service";

const professionSlice = createSlice({
  name: "professions",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastGetting: null,
  },
  reducers: {
    professionsRequested: (state) => {
      state.isLoading = true;
    },
    professionsReceived: (state, action) => {
      state.entities = action.payload;
      state.lastGetting = Date.now();
      state.isLoading = false;
    },
    professionsRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const {reducer: professionsReducer, actions} = professionSlice;
const {professionsRequested, professionsReceived, professionsRequestFailed} =
    actions;

function isOutdated(date) {
  if (Date.now() - date > 10 * 60 * 1000) {
    return true;
  }
  return false;
}

export const loadProfessionsList = () => async (dispatch, getState) => {
  const {lastGetting} = getState().professions;
  if (isOutdated(lastGetting)) {
    dispatch(professionsRequested());
    try {
      const {content} = await professionService.get();
      dispatch(professionsReceived(content));
    } catch (error) {
      dispatch(professionsRequestFailed(error.message));
    }
  }

};

export const getProfessions = () => (state) => state.professions.entities;
export const getProfessionsLoadingStatus = () => (state) =>
    state.professions.isLoading;
export const getProfessionsById = (professionsId) => (state) => {
  if (state.professions.entities) {
    for (const profession of state.professions.entities) {
      if (profession._id === professionsId) {
        return profession;
      }
    }
  }
  return {};
};

export default professionsReducer;
