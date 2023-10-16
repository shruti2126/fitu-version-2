/** @format */

import { db } from "../../../App";
import { collection, collectionGroup, getDocs, getDocsFromServer, query } from "firebase/firestore";
import { storeDataConverter } from "../../../Redux/firestoreDataConverter";
import { Store, StoreItem } from "../../../types/StoreTypes";
import { getAuth } from "firebase/auth";

const fetchStore = async () => {
  const q = query(collection(db, "store", getAuth().currentUser?.email!, "Inventory"));
  const snapshot = await getDocsFromServer(q);
  let items : StoreItem[] = []
  snapshot.docs.forEach(doc => {
    let newItem: StoreItem = {
      id: doc.get("id"),
      name: doc.get("name"),
      description: doc.get("description"),
      coins: doc.get("coins"),
      jewels: doc.get("jewels"), 
      isBought: doc.get("isBought"), 
      isActive: doc.get("isActive")
    };
    items = [...items, newItem]
  })
  // let store: Store = storeDataConverter.fromFirestore(snapshot);
  console.log('items in fetchStore() = ', items)
  return items;
};
export default fetchStore;
