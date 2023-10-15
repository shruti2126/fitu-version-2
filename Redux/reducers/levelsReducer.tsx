/** @format */

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Goal } from "../../types/GoalTypes";
import { level, levelRewards } from "../../types/LevelsType";
import updateLevels from "../../db/queries/rewards/updateLevels";

const initialLevelsState: level = {
  currentLevel: 1,
  experienceToComplete: 5,
  levelRewards: {
    coins: 0,
    jewels: 0,
  },
};

const levelSlice = createSlice({
  name: "levels",
  initialState: initialLevelsState,
  reducers: {
    PROGRESS_LEVEL: (state, action: PayloadAction<Goal>) => {
      let difficulty = action.payload.difficulty!;

      if (difficulty > 4) {
        let experienceRemaining =
          state.experienceToComplete - (difficulty! + 2);
        state.experienceToComplete = experienceRemaining;
      }
    },
    LEVEL_UP: (state, action: PayloadAction<Goal>) => {
      let difficulty = action.payload.difficulty!;

      if (difficulty > 4) {
        let experienceRemaining =
          state.experienceToComplete - (difficulty! + 2);
        state.experienceToComplete = experienceRemaining;
      }
      if (state.experienceToComplete <= 0) {
        const newLevel: number = state.currentLevel + 1;
        let newRewards: levelRewards;
        if (!(newLevel % 5)) {
          //if newLevel is NOT a multiple of 5, i.e. 1, 2, 3, 4,
          newRewards = {
            coins: 5,
            jewels: Math.floor(state.currentLevel / 2),
          };
        } else {
          // if newLevel === 5
          newRewards = {
            coins: Math.floor(state.currentLevel / 2),
            jewels: 0, // reset jewels
          };
        }
        const levelUP: level = {
          currentLevel: newLevel,
          experienceToComplete: state.currentLevel * 2,
          levelRewards: newRewards,
        };
        updateLevels(levelUP);
        state = levelUP;
      }
    },
  },
});

export default levelSlice.reducer;
export const { PROGRESS_LEVEL, LEVEL_UP } = levelSlice.actions;

// const levelsReducer = (
//   state: level = initialLevelsState,
//   action: { type: string; payload: any }
// ) => {
//   const payload = action.payload;

//   switch (action.type) {
//     case levelsActionType.PROGRESS_LEVEL:
//       console.log(action);
//       // const completedGoal: Goal = payload.goal;
//       let expPoints: number;

//       if (payload.difficulty < 4) expPoints = payload.difficulty;
//       else expPoints = payload.difficulty + 2;

//       const progressedGoal: level = {
//         currentLevel: state.currentLevel,
//         experienceToComplete: state.experienceToComplete - expPoints,
//         levelRewards: state.levelRewards,
//       };
//       state = progressedGoal;
//       return state;

//     case levelsActionType.LEVEL_UP:
//       console.log(state);

//       if (state.experienceToComplete > 0) return state;

//       const newLevel: number = state.currentLevel + 1;
//       let newRewards: levelRewards;

//       if (!(newLevel % 5)) { //if newLevel is NOT a multiple of 5, i.e. 1, 2, 3, 4,
//         newRewards = {
//           coins: 5,
//           jewels: Math.floor(state.currentLevel / 2),
//         };
//       } else { // if newLevel === 5
//         newRewards = {
//           coins: Math.floor(state.currentLevel / 2),
//           jewels: 0, // reset jewels
//         };
//       }

//       const levelUP: level = {
//         currentLevel: newLevel,
//         experienceToComplete: state.currentLevel * 2,
//         levelRewards: newRewards,
//       };
//       state = levelUP;
//       return state;

//     default:
//       return state;
//   }
// };

// export default levelsReducer;
