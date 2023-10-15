/** @format */

import { doc, collection, addDoc, query } from "firebase/firestore";
import { goalData, Goal } from "../../../types/GoalTypes";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import getFirestore from "../../config/config";
import { getObject } from "./asyncStorageHooks";

const db = getFirestore;

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

const addSleepGoal = async (sleepGoal: Goal) => {
  try {
    const collectionRef = collection(
      db,
      "sleep_goals",
      email,
      "daily sleep goals"
    );
    await addDoc(collectionRef, sleepGoal);
  } catch (error) {
    console.log("Error while adding new sleep goal = ", error);
  }
};

export default addSleepGoal;
