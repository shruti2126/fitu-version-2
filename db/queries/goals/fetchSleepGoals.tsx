/** @format */

import { getAuth } from "@firebase/auth";
import getFirestore from "../../config/config";
import {
  collection,
  collectionGroup,
  getDocs,
  query,
} from "firebase/firestore";

const db = getFirestore;

let auth = getAuth();

const fetchSleepGoals = async (email: string) => {
  const collectionRef = collection(db, "sleep_goals", email, "daily sleep gaols")
  const q = query(collectionRef);
  const snapshot = await getDocs(q);
  return snapshot;
};

export default fetchSleepGoals;
