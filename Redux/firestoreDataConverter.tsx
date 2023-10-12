/** @format */

import { DocumentData, QuerySnapshot } from "firebase/firestore";
import { Goal, goalReward } from "../types/GoalTypes";

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
