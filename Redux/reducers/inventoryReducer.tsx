/** @format */

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Inventory } from "../../types/InventoryTypes";
import { StoreItem } from "../../types/StoreTypes";
import { useAppSelector } from "../../Hooks/reduxHooks";

const initialInventoryState: Inventory = [];

const inventorySlice = createSlice({
  name: "inventory",
  initialState: initialInventoryState,
  reducers: {
    ADD_ITEM: (state, action: PayloadAction<StoreItem>) => {
      state.push(action.payload);
    },
  },
});

export default inventorySlice.reducer;
export const { ADD_ITEM } = inventorySlice.actions;
// export const inventoryItems = useAppSelector((state) => state.inventory);
// const inventoryReducer = (
//   state: Inventory = initialInventoryState,
//   action: { type: string; payload: StoreItem }
// ): Inventory => {
//   switch (action.type) {
//     case inventoryActionTypes.ADD_ITEM:
//       state.push(action.payload);
//       return state;
//   }
//   return state;
// };

// export default inventoryReducer;
