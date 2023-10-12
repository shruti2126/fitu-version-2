/** @format */

import deleteGoalFromFirestore from "../../Hooks/deleteGoalFromFirestore";
import fetchStepGoals from "../../Hooks/fetchStepGoals";
import fetchSleepGoals from "../../Hooks/fetchSleepGoals";

import { goalData, Goal, reducer } from "../../types/GoalTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createAction,
  createAsyncThunk,
  createReducer,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { getObject, storeObject } from "../../Hooks/asyncStorageHooks";
import { getAllGoals } from "../asyncThunkFirestoreQueries.tsx/getAllGoals";
import saveGoalsToFirestore from "../../Hooks/saveGoalsToFirestore";
import updateGoalFirestore from "../../Hooks/updateGoalFirestore";

const initialState: goalData = [
  {
    title: "Daily Steps Goal",
    data: [],
  },
  {
    title: "Daily Sleep Goal",
    data: [],
  },
];

export const getAllGoalData = getAllGoals;
const goalSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {
    ADD_GOAL: (state, action: PayloadAction<Goal>) => {
      if (action.payload.goalIsSteps) {
        state[0].data = [...state[0].data, action.payload];
        console.log("steps = ", state[0].data);
        saveGoalsToFirestore(state[0].data, "stepsGoals");
      } else {
        state[1].data = [...state[1].data, action.payload];
        saveGoalsToFirestore(state[1].data, "sleepGoals");
      }
    },
    DELETE_GOAL: (state, action: PayloadAction<Goal>) => {
      console.log("deleting goal = ", action.payload.title);
      if (action.payload.goalIsSteps) {
        state[0].data = state[0].data.filter((goal: Goal) => {
          goal.index !== action.payload.index;
        });
        deleteGoalFromFirestore(action.payload);
      } else {
        state[1].data = state[1].data.filter((goal: Goal) => {
          goal.index !== action.payload.index;
        });
        deleteGoalFromFirestore(action.payload);
      }
    },
    UPDATE_GOAL: (state, action: PayloadAction<Goal>) => {
      if (action.payload.goalIsSteps) {
        let goalToUpdate = state[0].data.at(action.payload.index);
        goalToUpdate = action.payload;
        console.log("Updated goal = ", goalToUpdate);
        console.log("steps goals data = ", state[0].data);
        updateGoalFirestore(action.payload, true);
      } else {
        let goalToUpdate = state[1].data.at(action.payload.index);
        goalToUpdate = action.payload;
        console.log("Updated goal = ", goalToUpdate);
        console.log("sleep goals data = ", state[1].data);
        updateGoalFirestore(action.payload, false);
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllGoals.pending, (state) => {})
      .addCase(getAllGoals.fulfilled, (state, action) => {
        let goals_data = action.payload;
        state[0].data = goals_data[0].data;
        state[1].data = goals_data[1].data;
      })
      .addCase(getAllGoals.rejected, (state, action) => {});
  },
});

export const { ADD_GOAL, DELETE_GOAL, UPDATE_GOAL } = goalSlice.actions;

export default goalSlice.reducer;


