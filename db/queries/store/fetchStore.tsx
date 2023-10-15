/** @format */

import { db } from "../../../App";
import { collectionGroup, getDocs, query } from "firebase/firestore";
import { storeDataConverter } from "../../../Redux/firestoreDataConverter";
import { Store } from "../../../types/StoreTypes";

const fetchStore = async () => {
  const q = query(collectionGroup(db, "Inventory"));
  const snapshot = await getDocs(q);
  let store: Store = storeDataConverter.fromFirestore(snapshot);
  return store;
};
export default fetchStore;
