/** @format */

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Store, StoreItem } from "../../types/StoreTypes";

const initialStoreState: Store = [
  {
    id: 1,
    name: "Fresh Made Coffee",
    description:
      "Not only can your daily cup of joe help you feel more energized, it may also helps burn fat and improve physical performance",
    coins: 5,
    jewels: 0,
    isBought: false,
    isActive: false,
  },
  {
    id: 2,
    name: "Healthy Salad",
    description: "A salad a day, keeps disease and aging at bay.",
    coins: 0,
    jewels: 20,
    isBought: false,
    isActive: false,
  },
  {
    id: 3,
    name: "Brand New Pakers Cap",
    description:
      "Go to the sport games with your friends and family. Let everyone know where your allegiance lies. ",
    coins: 10,
    jewels: 10,
    isBought: false,
    isActive: false,
  },
  {
    id: 4,
    name: "UW-Madison T-shirt",
    description:
      "Who doesn't love a free T-shirt with UW's logo on it? Go, atheletic bagder!",
    coins: 20,
    jewels: 20,
    isBought: false,
    isActive: false,
  },
  {
    id: 5,
    name: "NIKE Runing Shoes",
    description:
      "Walking too many miles already? Get these newly innovated shoes with NIKE technology. Keep walking!",
    coins: 100,
    jewels: 0,
    isBought: false,
    isActive: false,
  },
  {
    id: 6,
    name: "Road Bike",
    description:
      "Riding a bike is healthy, fun and a low-impact form of exercise for all ages. It also helps to protect you from serious diseases such as stroke, heart attack, some cancers, depression, diabetes, obesity and arthritis.",
    coins: 100,
    jewels: 100,
    isBought: false,
    isActive: false,
  },
  {
    id: 7,
    name: "Apple Watch",
    description:
      "Fantastic job! Now let Apple Watch help track your daily steps and sleep. You can also incorporate your personal data into our app through Apple Watch.",
    coins: 200,
    jewels: 200,
    isBought: false,
    isActive: false,
  },
];

const storeSlice = createSlice({
  name: "store",
  initialState: initialStoreState,
  reducers: {
    BUY_ITEM: (state, action: PayloadAction<StoreItem>) => {
      let boughtItem: StoreItem = state.find(
        (item) => item.id === action.payload.id
      )!;
      boughtItem.isBought = true;
      console.log("bought Item = ", boughtItem);
      state.filter((item) => item.id !== action.payload.id); //remove bought item from store listing
    },
  },
});

export const { BUY_ITEM } = storeSlice.actions;

// export const storeItemList = useAppSelector((state) => state.store);

export default storeSlice.reducer;
// const storeReducer = (
//   state: Store = initialStoreState,
//   action: { type: string; payload: StoreItem; rewards: any }
// ): Store => {
//   switch (action.type) {
//     case shopActionTypes.BUY_ITEM:
//       const payload: StoreItem = action.payload;
//       const boughtItem: StoreItem = {
//         ...payload,
//         isBought: true,
//       };

//       const updatedItemList: Store = state.filter(
//         (item: StoreItem) => item.id !== boughtItem.id
//       );
//       state = updatedItemList;

//       return state;
//   }
//   return state;
// };

// export default storeReducer;
