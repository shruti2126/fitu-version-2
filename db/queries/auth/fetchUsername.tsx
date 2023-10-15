/** @format */

import React from "react";
import { StyleSheet } from "react-native";
import { doc, getDoc } from "firebase/firestore";
import getFirestore from "../../config/config";

const db = getFirestore;

const fetchUsername = async (email: string): Promise<String | Error> => {
  console.log(email);
  const docRef = doc(db, "users", email);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.get("username");
  } else {
    // doc.data() will be undefined in this case
    console.log("No such User!");
    return Error("Couldn't find your account details. Please try signing in!");
  }
};

export default fetchUsername;

const styles = StyleSheet.create({});
