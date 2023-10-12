/** @format */

import deleteGoalFromFirestore from "../../Hooks/deleteGoalFromFirestore";

import { goalData, Goal } from "../../types/GoalTypes";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllGoals } from "../asyncThunkFirestoreQueries.tsx/getAllGoals";
import updateGoalFirestore from "../../Hooks/updateGoalFirestore";
import addStepsGoal from "../../Hooks/addStepsGoal";
import addSleepGoal from "../../Hooks/addSleepGoal";

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
        addStepsGoal(action.payload);
      } else {
        state[1].data = [...state[1].data, action.payload];
        addSleepGoal(action.payload);
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
