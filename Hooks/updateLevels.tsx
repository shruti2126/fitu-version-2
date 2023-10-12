/** @format */

import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { getAuth } from "@firebase/auth";
import getFirestore from "../config/config";
import { level } from "../types/LevelsType";

const db = getFirestore;

let auth = getAuth();

const updateLevels = async (levels: level) => {
  console.log("updating level = ", levels);
  const docRef = doc(db, "levels", auth.currentUser?.email!);
  const docSnap = await getDoc(docRef);

  await updateDoc(docRef, {
    ...levels,
  });
};

export default updateLevels;
