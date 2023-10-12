/** @format */

import {
  doc,
  updateDoc,
  getDoc,
  getDocs,
  collection,
  setDoc,
  where,
  query,
  collectionGroup,
} from "firebase/firestore";
import { Goal } from "../types/GoalTypes";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import getFirestore from "../config/config";
import { goalDataConverter } from "../Redux/firestoreDataConverter";

const db = getFirestore;

const auth = getAuth();
let email: string = "";
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    email = user.email!;
    // ...
  } else {
    // User is signed out
    // ...
  }
});

const updateGoalFirestore = async (goal: Goal, isSteps: boolean) => {
  let collectionName = "";
  let subcollection = "";
  if (isSteps) {
    collectionName = "steps_goals";
    subcollection = "daily steps goals";
  } else {
    collectionName = "sleep_goals";
    subcollection = "daily sleep goals";
  }
  console.log("Goal passed to update firestore = ", goal);
  // Query a reference to a subcollection

  const collectionRef = collection(db, collectionName, email, subcollection);

  const q = query(
    collectionGroup(db, subcollection),
    where("index", "==", goal.index)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    console.log("doc data = ", doc.data());
    setDoc(doc.ref, goal);
  });
};

export default updateGoalFirestore;
