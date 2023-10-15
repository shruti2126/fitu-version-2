/** @format */

import {
  collectionGroup,
  deleteDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../App";
import { StoreItem } from "../../../types/StoreTypes";

const deleteStoreItem = async (item: StoreItem) => {
  const subcollectionRef = collectionGroup(db, "Inventory");
  const queryDocs = query(subcollectionRef, where("id", "==", item.id));
  const querySnapshot = await getDocs(queryDocs);
  try {
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
  } catch (error) {
    return "Error deleting item = " + item + " : " + error;
  }
};
export default deleteStoreItem;
