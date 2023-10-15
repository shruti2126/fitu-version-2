/** @format */

import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../App";
import { getAuth } from "firebase/auth";
import { StoreItem } from "../../../types/StoreTypes";

const addMultipleItems = async (items: StoreItem[], email?: string) => {
	console.log("adding multiple items...")
  if (email === undefined) {
    email = getAuth().currentUser?.email!;
  }
  const collectionRef = collection(db, "store", email, "Inventory");
  try {
    items.forEach(async (items: StoreItem) => {
      await addDoc(collectionRef, items);
    });
  } catch (error) {
    console.log("Error adding new items to store  = ", error);
    return error;
  }
};

export default addMultipleItems;
