/** @format */

import { StyleSheet } from "react-native";
import {
  doc,
  collection,
  setDoc,
  updateDoc,
  arrayUnion,
  getDoc,
} from "firebase/firestore";
import { goalData, Goal } from "../types/GoalTypes";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import getFirestore from "../config/config";
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

// const saveGoalsToFirestore = async (goalData: goalData) => {
// console.log("inside saveGoalsToFirestore");
// goalData.forEach(async (goal) => {
//   let docName = "";
//   if (goal.title === "Daily Steps Goal") {
//     docName = "steps_goals";
//   } else {
//     docName = "sleep_goals";
//   }
//   const docRef = doc(db, docName, email);
//   const docSnap = await getDoc(docRef);
//   console.log("docSnap data = ", docSnap.data());
//   if (docSnap.exists()) {
//     console.log("docSnap exists = ", docSnap.get("goals"));
//     goal.data.forEach(async (goal) => {
//       await updateDoc(docRef, {
//         goals: arrayUnion(goal),
//       });
//     });
//   } else {
//     console.log("goal data = ", goal.data);
//     await setDoc(docRef, {
//       goals: goal.data,
//     });
//   }
// });
// };
const saveGoalsToFirestore = async (goals: Goal[], title: string) => {
  console.log("inside saveGoalsToFirestore, goals passed in = ", goals);

  // Create an array of promises for Firestore updates
  const updatePromises: Promise<void>[] = [];

  let docName = "";
  if (title === "stepsGoals") {
    docName = "steps_goals";
  } else {
    docName = "sleep_goals";
  }
  const docRef = doc(db, docName, email);
  goals.forEach((goal) => {
    // Add the Firestore update promise to the array
    updatePromises.push(
      getDoc(docRef).then((docSnap) => {
        if (docSnap.exists()) {
          return updateDoc(docRef, {
            goals: arrayUnion(goal),
          });
        } else {
          return setDoc(docRef, {
            goals: goal,
          });
        }
      })
    );
  });
  try {
    // Wait for all Firestore updates to complete
    await Promise.all(updatePromises);
    console.log("Goals saved to Firestore successfully.");
  } catch (error) {
    console.error("Error saving goals to Firestore:", error);
  }
};

export default saveGoalsToFirestore;
