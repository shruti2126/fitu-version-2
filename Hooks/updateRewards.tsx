/** @format */

import {
  doc,
  collection,
  setDoc,
  updateDoc,
  arrayUnion,
  getDoc,
} from "firebase/firestore";
import { goalReward, Goal } from "../types/GoalTypes";
import { getAuth } from "@firebase/auth";
import getFirestore from "../config/config";

const db = getFirestore;

let auth = getAuth();

const updateRewards = async (rewards: goalReward) => {
  console.log("updating rewards = ", rewards)
  const docRef = doc(db, "rewards", auth.currentUser?.email!);
  const docSnap = await getDoc(docRef);

    await updateDoc(docRef, { ...rewards });
};

export default updateRewards;
