/** @format */

import { createAsyncThunk } from "@reduxjs/toolkit";
import fetchStore from "../../db/queries/store/fetchStore";
const getStoreItems = createAsyncThunk("items/getStoreItems", async () => {
  return fetchStore();
});
export default getStoreItems;
