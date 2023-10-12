/** @format */

import { StyleSheet } from "react-native";
import {
  doc,
  collection,
  setDoc,
  updateDoc,
  arrayUnion,
  getDoc,
  getDocFromServer,
  getDocs,
  addDoc,
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

const saveGoalsToFirestore = async (goals: Goal[], title: string) => {
  console.log("inside saveGoalsToFirestore, goals passed in = ", goals);


  let collectionName = "";
  let subcollection = "";
  if (title === "stepsGoals") {
    collectionName = "steps_goals";
    subcollection = "daily steps goals";
  } else {
    collectionName = "sleep_goals";
    subcollection = "daily sleep goals";
  }

  goals.forEach(async (goal) => {
    try {
      const collectionRef = collection(db, collectionName, email, subcollection);
      const docRef = await addDoc(collectionRef, goal);
      console.log("Document written with ID: ", docRef.id)
      console.log("Goals saved to Firestore successfully.");
    } catch (error) {
      console.error("Error saving goals to Firestore:", error);
    }
  });
};

export default saveGoalsToFirestore;
