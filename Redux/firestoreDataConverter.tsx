/** @format */

import {
  DocumentData,
  DocumentSnapshot,
  QuerySnapshot,
} from "firebase/firestore";
import { Goal, goalReward } from "../types/GoalTypes";
import { Store, StoreItem } from "../types/StoreTypes";

export const goalDataConverter = {
  fromFirestore: (snapshot: QuerySnapshot<DocumentData>, options?: any) => {
    const docArr: Goal[] = [];
    snapshot.forEach((doc) => {
      let newDoc = {
        index: doc.get("index"),
        isMainGoal: doc.get("isMainGoal"),
        goalIsSteps: doc.get("goalIsSteps"),
        title: doc.get("title"),
        note: doc.get("note"),
        difficulty: doc.get("difficulty"),
        rewards: doc.get("rewards"),
      };
      docArr.push(newDoc);
    });
    return docArr;
  },
};

export const storeDataConverter = {
  fromFirestore: (querySnap: QuerySnapshot<DocumentData>) => {
    const itemArr : Store = []
    querySnap.forEach(doc => {
      const item: StoreItem = {
        id: doc.get("id"),
        name: doc.get("name"),
        description: doc.get("description"),
        coins: doc.get("coins"),
        jewels: doc.get("jewels"),
        isBought: doc.get("isBought"),
        isActive: doc.get("isActive"),
      };
      itemArr.push(item);
    })
    console.log("itemArr = ", itemArr)
    return itemArr;
  },
};


