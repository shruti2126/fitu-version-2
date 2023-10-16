/** @format */

import { createAsyncThunk } from "@reduxjs/toolkit";
import { query, collectionGroup, getDocsFromServer } from "firebase/firestore";
import { db } from "../../App";
import { StoreItem } from "../../types/StoreTypes";

export const getStoreItems = createAsyncThunk(
  "items/getStoreItems",
  async () => {
    const q = query(collectionGroup(db, "Inventory"));
    const snapshot = await getDocsFromServer(q);
    let arrOfId: number[] = [];
    let items: StoreItem[] = [];
    console.log("length = ", snapshot.size);
    snapshot.forEach((doc) => {
      if (!arrOfId.includes(doc.get("id"))) {
        let newItem: StoreItem = {
          id: doc.get("id"),
          name: doc.get("name"),
          description: doc.get("description"),
          coins: doc.get("coins"),
          jewels: doc.get("jewels"),
          isBought: doc.get("isBought"),
          isActive: doc.get("isActive"),
        };
        arrOfId.push(doc.get("id"));
        items = [...items, newItem];
      }
    });

    return items;
  }
);
