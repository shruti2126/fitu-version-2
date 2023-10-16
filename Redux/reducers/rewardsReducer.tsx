/** @format */

import updateRewards from "../../db/queries/rewards/updateRewards";
import { goalReward, Goal } from "../../types/GoalTypes";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getRewards } from "../asyncThunkFirestoreQueries.tsx/getRewardsFromFirestore";

const initialRewardsState: goalReward = {
  coins: 0,
  jewels: 0,
};

export const getRewardsFromFirestore = getRewards;
const rewardsSlice = createSlice({
  name: "rewards",
  initialState: initialRewardsState,
  reducers: {
    INCREASE_REWARDS: (state, action: PayloadAction<goalReward>) => {
      state.coins += action.payload.coins;
      state.jewels += action.payload.jewels;
      console.log(
        "new coins, new jewels = ",
        state.coins + " , " + state.jewels
      );
      let newRewards = { ...state };
      updateRewards(newRewards);
    },
    DECREASE_REWARDS: (state, action: PayloadAction<goalReward>) => {
      state.coins -= action.payload.coins;
      state.jewels -= action.payload.jewels;
      console.log("decreasing rewards = ", state.coins,  " , ", state.jewels)
      updateRewards({ ...state });
    },
  },
  extraReducers(builder) {
    builder.addCase(getRewards.fulfilled, (state, action) => {
      state.coins = action.payload.coins;
      state.jewels = action.payload.jewels;
    });
  },
});

export const { INCREASE_REWARDS, DECREASE_REWARDS } = rewardsSlice.actions;

export default rewardsSlice.reducer;
