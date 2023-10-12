/** @format */

import updateRewards from "../../Hooks/updateRewards.tsx";
import { goalReward, Goal } from "../../types/GoalTypes.ts";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialRewardsState: goalReward = {
  coins: 0,
  jewels: 0,
};

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
//     const rewards = await fetchRewards(data.email);
//     if (rewards != undefined) {
//       initialRewardsState.coins = rewards.coins;
//       initialRewardsState.jewels = rewards.jewels;
//     }
//   }
// });

// type increaseRewards = { rewardType: string; amount: number; inventory: any };
// type decreaseRewards = StoreItem;

const rewardsSlice = createSlice({
  name: "rewards",
  initialState: initialRewardsState,
  reducers: {
    INCREASE_REWARDS: (state, action: PayloadAction<goalReward>) => {
      state.coins += action.payload.coins;
      state.jewels += action.payload.jewels;
      updateRewards(action.payload);
    },
    DECREASE_REWARDS: (state, action: PayloadAction<goalReward>) => {
      state.coins -= action.payload.coins;
      state.jewels -= action.payload.jewels;
      updateRewards(action.payload);
    },
  },
});

export const { INCREASE_REWARDS, DECREASE_REWARDS } = rewardsSlice.actions;

// export const totalCoins = useAppSelector((state) => state.rewards.coins);
// export const totalJewels = useAppSelector((state) => state.rewards.jewels);
export default rewardsSlice.reducer;

// const rewardsReducer = (
//   state: goalReward = initialRewardsState,
//   action: { type: string; payload: increaseRewards | decreaseRewards }
// ) => {
//   const payload = action.payload;
//   switch (action.type) {
//     case rewardActionTypes.INCREASE_REWARDS:
//       // let newAmount;
//       // if (!payload.effect) {
//       // 	switch (payload.effect) {
//       // 		case 'increaseRewards':
//       // 			newAmount = payload.effect.effect(amount);
//       // 	}
//       // }

//       let newAmount = payload.amount;
//       payload.inventory.forEach((item: StoreItem) => {
//         if (item.isActive) {
//           switch (item.effect?.type) {
//             case "increaseRewards":
//               newAmount = item.effect.effect(payload.amount);
//             // case 'singleUseIncreaseRewards':
//           }
//         }
//       });

//       // if (payload.effect !== undefined) {
//       // 	payload.amount = payload.effect?.effect(payload.amount)
//       // }

//       if (payload.rewardType === "coins") {
//         const coins = state.coins + newAmount;
//         state = {
//           coins: coins,
//           jewels: state.jewels,
//         };
//       } else if (payload.rewardType === "jewels") {
//         const jewels = state.jewels + newAmount;
//         state = {
//           coins: state.coins,
//           jewels: jewels,
//         };
//       } else {
//         throw `Incorrect reward type: ${payload.rewardType} (must be either 'coins' or 'jewels')`;
//       }
//       updateRewards(state);
//       return state;

//     case rewardActionTypes.DECREASE_REWARDS:
//       state = {
//         coins: state.coins - payload.coins,
//         jewels: state.jewels - payload.jewels,
//       };
//       updateRewards(state);
//       return state;

//     default:
//       return state;
//   }
// };

// export default rewardsReducer;
