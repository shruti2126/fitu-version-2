/** @format */

import deleteGoalFromFirestore from "../../Hooks/deleteGoalFromFirestore";
import fetchStepGoals from "../../Hooks/fetchStepGoals";
import fetchSleepGoals from "../../Hooks/fetchSleepGoals";
import saveGoalsToFirestore from "../../Hooks/saveGoalsToFirestore";
import { goalData, Goal, reducer } from "../../types/GoalTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

// const getData = async () => {
//   try {
//     const jsonValue = await AsyncStorage.getItem("userInfo");
//     return jsonValue != null ? JSON.parse(jsonValue) : null;
//   } catch (e) {
//     // error reading value
//     console.log("there was an error = ", e);
//   }
// };

// const data = getData().then(async (data) => {
//   if (data != null) {
//     const sleep_goals = await fetchSleepGoals(data.email);
//     const steps_goals = await fetchStepGoals(data.email);

//     if (steps_goals != undefined) {
//       if (steps_goals?.goals != undefined && steps_goals.goals.length != 0) {
//         steps_goals.goals.forEach((goal) => {
//           initialGoalState[0].data.push(goal);
//         });
//       }
//       if (steps_goals.MainGoal != undefined && steps_goals.MainGoal.length != 0)
//         initialGoalState[0].data.push(steps_goals.MainGoal);
//     }

//     if (sleep_goals != undefined) {
//       if (sleep_goals?.goals != undefined) {
//         sleep_goals?.goals.forEach((goal) => {
//           initialGoalState[1].data.push(goal);
//         });
//       }
//       if (
//         sleep_goals?.MainGoal != undefined &&
//         sleep_goals?.MainGoal.length != 0
//       ) {
//         initialGoalState[1].data.push(sleep_goals?.MainGoal);
//       }
//     }
//     console.log(initialGoalState);
//   }
// });

const goalSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {
    ADD_GOAL: (state, action: PayloadAction<Goal>) => {
      if (action.payload.goalIsSteps) {
        console.log("pushing new goal");
        state[0].data = [...state[0].data, action.payload];
        console.log("new state = ", state[0].data);
      } else {
        state[1].data.push(action.payload);
      }
    },
    DELETE_GOAL: (state, action: PayloadAction<Goal>) => {
      if (action.payload.goalIsSteps) {
        state[0].data.filter((goal: Goal) => {
          goal.index !== action.payload.index;
        });
      } else {
        state[1].data.filter((goal: Goal) => {
          goal.index !== action.payload.index;
        });
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
});

export const { ADD_GOAL, DELETE_GOAL, UPDATE_GOAL } = goalSlice.actions;

// export const showAllSleepGoals = useAppSelector((state) => state.goals[1].data);
// export const showAllStepsGoals = useAppSelector((state) => state.goals[0].data);
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
