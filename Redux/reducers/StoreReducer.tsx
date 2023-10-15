/** @format */

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Store, StoreItem } from "../../types/StoreTypes";
import deleteStoreItem from "../../db/queries/store/deleteStoreItem";
import addStoreItem from "../../db/queries/store/addStoreItem";
import getStoreItems from "../asyncThunkFirestoreQueries.tsx/getStoreItems";

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
      let boughtItem: StoreItem = state.data.find(
        (item) => item.id === action.payload.id
      )!;
      boughtItem.isBought = true;
      console.log("bought Item = ", boughtItem);
      state.data.filter((item) => item.id !== action.payload.id); //remove bought item from store listing
      deleteStoreItem(boughtItem);
    },
    ADD_ITEM: (state, action: PayloadAction<StoreItem>) => {
      state.data = [...state.data, action.payload];
      addStoreItem(action.payload);
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchStore.fulfilled, (state, action) => {
      state.loading = false;
      let newStoreState: Store = action.payload;
      state.data = state.data.concat(newStoreState);
      console.log("store state after fetching inventory = ", state);
    });
    builder.addCase(fetchStore.pending, (state) => {
      state.loading = true; // Set loading to true when the fetchStore thunk is pending
    });
  },
});

export const { BUY_ITEM, ADD_ITEM } = storeSlice.actions;

export default storeSlice.reducer;
