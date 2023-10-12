/** @format */

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Goal } from "../types/GoalTypes";
import { getAuth } from "@firebase/auth";
import getFirestore from "../config/config";
import { doc, getDoc } from "@firebase/firestore";
import { collection, collectionGroup, getDocs, query } from "firebase/firestore";

const db = getFirestore;

let auth = getAuth();

const fetchStepsGoals = async (email: string) => {
  const q = query(collectionGroup(db, "daily steps goals"));
  const querySnapshot = await getDocs(q);
  return querySnapshot;
};

export default fetchStepsGoals;
