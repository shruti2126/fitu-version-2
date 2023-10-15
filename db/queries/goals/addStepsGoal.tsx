/** @format */

import { doc, collection, addDoc, query } from "firebase/firestore";
import { goalData, Goal } from "../../../types/GoalTypes";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import getFirestore from "../../config/config";


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

const addStepsGoal = async (stepsGoal: Goal) => {
  try {
    const collectionRef = collection(
      db,
      "steps_goals",
      email,
      "daily steps goals"
    );
    await addDoc(collectionRef, stepsGoal);
  } catch (error) {
    console.log("Error while adding new steps goal = ", error);
  }
};

export default addStepsGoal;
