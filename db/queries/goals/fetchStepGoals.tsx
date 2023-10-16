/** @format */

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Goal } from "../../../types/GoalTypes";
import { getAuth } from "@firebase/auth";
import getFirestore from "../../config/config";
import { doc, getDoc } from "@firebase/firestore";
import {
  collection,
  collectionGroup,
  getDocs,
  query,
} from "firebase/firestore";

const db = getFirestore;

let auth = getAuth();

const fetchStepsGoals = async (email: string) => {
const collectionRef = collection(db, "steps_goals", email, "daily steps goals");
const q = query(collectionRef);
const snapshot = await getDocs(q);
return snapshot;
};

export default fetchStepsGoals;
