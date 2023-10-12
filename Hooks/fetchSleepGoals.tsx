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

const fetchSleepGoals = async (email: string) => {
 
  const q = query(collectionGroup(db, "daily sleep goals"));
  const snapshot = await getDocs(q);
  
  return snapshot;
};

export default fetchSleepGoals;


