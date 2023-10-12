/** @format */

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  arrayRemove,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

import { Goal } from "../types/GoalTypes";
import { getAuth } from "@firebase/auth";
import getFirestore from "../config/config";
import { onAuthStateChanged } from "firebase/auth";

const db = getFirestore;
let auth = getAuth();
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
export default async function deleteGoalFromFirestore(
  goal: Goal,
) {
  var collectionName = "";
  if (goal.goalIsSteps) {
    collectionName = "steps_goals";
  } else {
    collectionName = "sleep_goals";
  }
  // Query a reference to a subcollection
  const querySnapshot = await getDocs(
    collection(db, collectionName, email, "daily steps goals")
  );
  querySnapshot.forEach(async (doc) => {
    if (doc.get("index") === goal.index) {
      await deleteDoc(doc.ref);
    }
  });
}
