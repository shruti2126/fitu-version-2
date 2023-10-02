/** @format */

import { createAsyncThunk } from "@reduxjs/toolkit";
import { getObject } from "../../Hooks/asyncStorageHooks";
import fetchSleepGoals from "../../Hooks/fetchSleepGoals";
import fetchStepsGoals from "../../Hooks/fetchStepGoals";
import { Goal, goalData } from "../../types/GoalTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();
let email : string = ""
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

export const getAllGoals = createAsyncThunk(
  "goals/getGoals",
  async () => {
      const sleep = await fetchSleepGoals(email);
	  const steps = await fetchStepsGoals(email);
	  const goalState : goalData = [
      {
        title: "Daily Steps Goal",
        data: [],
      },
      {
        title: "Daily Sleep Goal",
        data: [],
      },
    ];
      if (steps != undefined) {
        if (steps?.goals != undefined && steps.goals.length != 0) {
          steps.goals.forEach((goal: Goal) => {
            goalState[0].data.push(goal);
          });
        }
      }

      if (sleep != undefined) {
        if (sleep?.goals != undefined) {
          sleep?.goals.forEach((goal: Goal) => {
            goalState[1].data.push(goal);
          });
        }
	  }
	  console.log("goals state in getAllGoals = ", goalState)
   
    return goalState;
  }
);
