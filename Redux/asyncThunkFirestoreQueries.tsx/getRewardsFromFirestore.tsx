/** @format */

import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { goalReward } from "../../types/GoalTypes";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../App";
import fetchRewards from "../../db/queries/rewards/fetchRewards";

const auth = getAuth();
let email: string = "";
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    email = user.email!;
    // ...
  } else {
    // User is signed out
    // ...
  }
});

export const getRewards = createAsyncThunk("rewards/getRewards", async () => {
  // const docRef = doc(db, "rewards", auth.currentUser?.email!);
  // const docSnap = await getDoc(docRef);
  // let rewards: goalReward = {
  //   coins: 0,
  //   jewels: 0,
  // };
  // try {
  //   let coins = docSnap.get("coins");
  //   let jewels = docSnap.get("jewels");
  //   rewards = { coins, jewels };
  // } catch (error) {
  //   console.log("error while fetching rewards = ", error);
  // }
  // return rewards;
  return fetchRewards();
});
