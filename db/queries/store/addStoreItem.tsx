/** @format */

import { addDoc, collection, collectionGroup } from "firebase/firestore";
import { db } from "../../../App";
import { StoreItem } from "../../../types/StoreTypes";
import { getAuth } from "firebase/auth";

const addStoreItem = async (item: StoreItem) => {
  const collectionRef = collection(
    db,
    "store",
    getAuth().currentUser?.email!,
    "Inventory"
  );
  try {
    await addDoc(collectionRef, item);
  } catch (error) {
    console.log("Error adding new item to store in Firestore = ", error);
    return error;
  }
};
export default addStoreItem;
