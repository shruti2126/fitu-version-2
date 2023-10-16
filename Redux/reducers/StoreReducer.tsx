/** @format */

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Store, StoreItem } from "../../types/StoreTypes";
import deleteStoreItem from "../../db/queries/store/deleteStoreItem";
import addStoreItem from "../../db/queries/store/addStoreItem";
import {getStoreItems} from "../asyncThunkFirestoreQueries.tsx/getStoreItems";

const initialStoreState: Store = [];

export const fetchStore = getStoreItems;
const storeSlice = createSlice({
  name: "store",
  initialState: {
    data: initialStoreState,
    loading: false,
  },
  reducers: {
    BUY_ITEM: (state, action: PayloadAction<StoreItem>) => {
       const itemIndex = state.data.findIndex(
         (item) => item.id === action.payload.id
       );
       if (itemIndex !== -1) {
         state.data = state.data.filter((item, index) => index !== itemIndex);
         console.log("store state after deleting item from list = ", state.data)
         deleteStoreItem(action.payload);
       }
    },
    ADD_ITEM: (state, action: PayloadAction<StoreItem>) => {
      state.data = [...state.data, action.payload];
      addStoreItem(action.payload);
    },
  },
  extraReducers(builder) {
    builder.addCase(getStoreItems.fulfilled, (state, action) => {
      state.loading = false;
      let newStoreState: Store = action.payload;
      state.data = [...state.data, ...newStoreState];
    });
    builder.addCase(getStoreItems.pending, (state) => {
      state.loading = true; // Set loading to true when the fetchStore thunk is pending
    });
  },
});

export const { BUY_ITEM, ADD_ITEM } = storeSlice.actions;

export default storeSlice.reducer;
