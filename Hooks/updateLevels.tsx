/** @format */

import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { getAuth } from "@firebase/auth";
import getFirestore from "../config/config";
import { level } from "../types/LevelsType";

const db = getFirestore;

let auth = getAuth();

const updateLevels = async (levels: level) => {
  console.log("trying to update rewards...");
  const docRef = doc(db, "levels", auth.currentUser?.email!);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    await updateDoc(docRef, {
      levels,
    });
  } else {
    await setDoc(docRef, {
      levels,
    });
  }
};

export default updateLevels;
