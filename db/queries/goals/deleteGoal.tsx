/** @format */

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  arrayRemove,
  collection,
  collectionGroup,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import { Goal } from "../../../types/GoalTypes";
import { getAuth } from "@firebase/auth";
import getFirestore from "../../config/config";
import { onAuthStateChanged } from "firebase/auth";
import { sub } from "react-native-reanimated";

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
export default async function deleteGoalFromFirestore(goal: Goal) {
  var collectionName = "";
  let subcollection = "";
  if (goal.goalIsSteps) {
    collectionName = "steps_goals";
    subcollection = "daily steps goals";
  } else {
    collectionName = "sleep_goals";
    subcollection = "daily sleep goals";
  }

  const q = query(
    collectionGroup(db, subcollection),
    where("index", "==", goal.index)
  );
  const qSnap = await getDocs(q);
  qSnap.forEach((doc) => {
    deleteDoc(doc.ref);
  });
}
