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
        state[0].data = [...state[0].data, action.payload];
      } else {
        state[1].data = [...state[1].data, action.payload];
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
        console.log("state is updated = ", state[0].data + ", ", state[1].data);
      })
      .addCase(getAllGoals.rejected, (state, action) => {});
  },
});

export const { ADD_GOAL, DELETE_GOAL, UPDATE_GOAL } = goalSlice.actions;

export default goalSlice.reducer;

// switch (action.type) {
//   case goalActionTypes.ADD_GOAL:
//     const newGoal = action.payload;

//     if (newGoal.goalIsSteps) state[0].data.push(newGoal);
//     else state[1].data.push(newGoal);

//     saveGoalsToFirestore(newGoal);
//     return state;

//   case goalActionTypes.DELETE_GOAL:
//     const goalToDelete: Goal = action.payload;

//     deleteGoalFromFirestore(goalToDelete);

//     if (goalToDelete.goalIsSteps)
//       newState[0].data = state[0].data.filter(
//         (goal) => goal.index != goalToDelete.index
//       );
//     else
//       newState[1].data = state[1].data.filter(
//         (goal) => goal.index != goalToDelete.index
//       );

//     state = newState;
//     return state;

//   default:
//     return state;
// }
