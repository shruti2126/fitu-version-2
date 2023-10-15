/** @format */

import { createAsyncThunk } from "@reduxjs/toolkit";
import fetchSleepGoals from "../../db/queries/goals/fetchSleepGoals";
import fetchStepsGoals from "../../db/queries/goals/fetchStepGoals";
import { Goal, goalData } from "../../types/GoalTypes";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { goalDataConverter } from "../firestoreDataConverter";

const auth = getAuth();
let email: string = "";
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    email = user.email!;
    // ...
  } else {
    // User is signed out
    // ...
  }
});

export const getAllGoals = createAsyncThunk("goals/getGoals", async () => {
  const sleep = await fetchSleepGoals(email);
  const steps = await fetchStepsGoals(email);
  const goalState: goalData = [
    {
      title: "Daily Steps Goal",
      data: [],
    },
    {
      title: "Daily Sleep Goal",
      data: [],
    },
  ];

  const stepsDocArr = goalDataConverter.fromFirestore(steps);
  stepsDocArr.forEach((stepsGoal) => {
    goalState[0].data.push(stepsGoal);
  });
  const sleepDocArr = goalDataConverter.fromFirestore(sleep);
  sleepDocArr.forEach((sleepGoal) => {
    goalState[1].data.push(sleepGoal);
  });
  console.log("Goal state = ", goalState);
  return goalState;
});
