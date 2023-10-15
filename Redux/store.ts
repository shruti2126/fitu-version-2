/** @format */

import { configureStore } from "@reduxjs/toolkit";
import goalReducer from "./reducers/goalReducer";
import rewardsReducer from "./reducers/rewardsReducer";
import storeReducer from "./reducers/StoreReducer";

import levelsReducer from "./reducers/levelsReducer";

export const store = configureStore({
  reducer: {
    goals: goalReducer,
    rewards: rewardsReducer,
    store: storeReducer,
    levels: levelsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
