/** @format */

import deleteGoalFromFirestore from "../../db/queries/goals/deleteGoal";

import { goalData, Goal } from "../../types/GoalTypes";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllGoals } from "../asyncThunkFirestoreQueries.tsx/getAllGoals";
import updateGoalFirestore from "../../db/queries/goals/updateGoal";
import addStepsGoal from "../../db/queries/goals/addStepsGoal";
import addSleepGoal from "../../db/queries/goals/addSleepGoal";
import { ActionCodeOperation } from "firebase/auth";

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
        state[0].data = [action.payload, ...state[0].data];
        console.log("steps = ", state[0].data);
        addStepsGoal(action.payload);
      } else {
        state[1].data = [action.payload, ...state[1].data];
        addSleepGoal(action.payload);
      }
    },
    DELETE_GOAL: (state, action: PayloadAction<Goal>) => {
      if (action.payload.goalIsSteps) {
        let toDelete = state[0].data.find(
          (goal) => goal.index === action.payload.index
        );
        state[0].data = state[0].data.filter(
          (goal) => goal.index !== toDelete?.index
        );
        deleteGoalFromFirestore(action.payload);
      } else {
        let toDelete = state[1].data.find(
          (goal) => goal.index === action.payload.index
        );

        state[1].data = state[1].data.filter(
          (goal) => goal.index !== toDelete?.index
        );
        deleteGoalFromFirestore(action.payload);
      }
    },
    UPDATE_GOAL: (state, action: PayloadAction<Goal>) => {
      if (action.payload.goalIsSteps) {
        let toUpdate = state[0].data.find(
          (goal) => goal.index === action.payload.index
        );
        state[0].data = state[0].data.toSpliced(
          state[0].data.findIndex((goal) => goal.index === toUpdate!.index),
          1,
          action.payload
        );
        updateGoalFirestore(action.payload, true);
      } else {
        let toUpdate = state[1].data.find(
          (goal) => goal.index === action.payload.index
        );
        state[1].data = state[1].data.toSpliced(
          state[0].data.findIndex((goal) => goal.index === toUpdate!.index),
          1,
          action.payload
        );
        updateGoalFirestore(action.payload, false);
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(getAllGoals.fulfilled, (state, action) => {
      let goals_data = action.payload;
      state[0].data = goals_data[0].data;
      state[1].data = goals_data[1].data;
    });
  },
});

export const { ADD_GOAL, DELETE_GOAL, UPDATE_GOAL } = goalSlice.actions;

export default goalSlice.reducer;
