/** @format */

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { doc, collection, setDoc } from "firebase/firestore";
import getFirestore from "../config/config";
import { Goal } from "../types/GoalTypes";

const db = getFirestore;
export async function saveUserToFirestore(Username: string, email: string) {
  const data = {
    username: Username,
    email: email,
  };

  await setDoc(doc(db, "users", email.toLowerCase()), data);
}

export async function initializeDocsInFirestore(email: string) {
  // await setDoc(doc(db, "sleep_goals", email.toLocaleLowerCase()), {
  //   goals: [],
  // });
  // await setDoc(doc(db, "steps_goals", email.toLocaleLowerCase()), {
  //   goals: [],
  // });
  await setDoc(doc(db, "rewards", email.toLocaleLowerCase()), {
    coins: 0,
    jewels: 0,
  });
  await setDoc(doc(db, "levels", email), {
    currentLevel: 1,
    experienceToComplete: 5,
    levelRewards: {
      coins: 1,
      jewels: 0,
    },
  });
}
