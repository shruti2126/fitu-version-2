/** @format */

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { arrayRemove, doc, getDoc, updateDoc } from "firebase/firestore";

import { Goal } from "../types/GoalTypes";
import { getAuth } from "@firebase/auth";
import getFirestore from "../config/config";

const db = getFirestore;
let auth = getAuth();
export default async function deleteGoalFromFirestore(goal: Goal) {
  var collectionName = "";
  if (goal.goalIsSteps) {
    collectionName = "steps_goals";
  } else {
    collectionName = "sleep_goals";
  }

  const docRef = doc(db, collectionName, auth.currentUser?.email!);
  const docSnap = await getDoc(docRef);
  console.log("docSnap = ", docSnap.data());
  if (docSnap.exists()) {
    await updateDoc(docRef, {
      goals: arrayRemove(goal),
    });
    console.log("after deleting goal = ", docSnap.data());
  }
}
