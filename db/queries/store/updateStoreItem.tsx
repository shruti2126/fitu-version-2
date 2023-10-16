/** @format */

import {
  collection,
  collectionGroup,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../App";
import { StoreItem } from "../../../types/StoreTypes";
import { getAuth } from "firebase/auth";

const updateStoreItem = async (item: StoreItem) => {
  const subcollectionRef = collection(
    db,
    "store",
    getAuth().currentUser?.email!,
    "Inventory"
  );
  const queryDocs = query(subcollectionRef, where("id", "==", item.id));
  const querySnapshot = await getDocs(queryDocs);
  try {
    querySnapshot.forEach(async (doc) => {
      await updateDoc(doc.ref, {
        ...item,
      });
    });
  } catch (error) {
    console.log("Error updating store item = ", item, ", ", error);
    return error;
  }
};

export default updateStoreItem;
