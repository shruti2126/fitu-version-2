/** @format */

import { createAsyncThunk } from "@reduxjs/toolkit";
import fetchSleepGoals from "../../Hooks/fetchSleepGoals";
import { getObject } from "../../Hooks/asyncStorageHooks";


export const getSleepGoals = createAsyncThunk(
  "goals/getSleepGoals",
  async () => {
    getObject("userInfo").then(async (user) => {
      return await fetchSleepGoals(user.email);
    });
  }
);
