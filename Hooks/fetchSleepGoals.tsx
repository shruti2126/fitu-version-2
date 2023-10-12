/** @format */

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Goal } from "../types/GoalTypes";
import { getAuth } from "@firebase/auth";
import getFirestore from "../config/config";
import { doc, getDoc } from "@firebase/firestore";
import { collection, getDocs } from "firebase/firestore";

const db = getFirestore;

let auth = getAuth();

const fetchSleepGoals = async (email: string) => {
  // const docRef = doc(db, "sleep_goals", email, "daily sleep goals");
  // const docSnap = await getDoc(docRef);

  // if (docSnap.exists()) {
  //     //console.log(docSnap.data())
  //     return docSnap.data();
  // } else {
  //     // doc.data() will be undefined in this case
  //     console.log("No such document!");
  //     return null
  // }
  // Query a reference to a subcollection
  const querySnapshot = await getDocs(
    collection(db, "sleep_goals", email, "daily sleep goals")
  );
  console.log("query snapshot docs = " , querySnapshot);
  return querySnapshot;
};

export default fetchSleepGoals;


