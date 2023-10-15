/** @format */

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Goal } from "../../../types/GoalTypes";
import { getAuth } from "@firebase/auth";
import getFirestore from "../../config/config";
import { doc, getDoc } from "@firebase/firestore";

const db = getFirestore;

let auth = getAuth();

const fetchRewards = async () => {
  console.log("trying to fetch rewards...");
  const docRef = doc(db, "rewards", auth.currentUser?.email!);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log(docSnap.data());
    let coins = docSnap.get("coins");
    let jewels = docSnap.get("jewels");
    return { coins, jewels };
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    return { coins: 0, jewels: 0 };
  }
};

export default fetchRewards;
