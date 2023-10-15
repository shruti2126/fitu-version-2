/** @format */

import { Goal, goalData } from "../types/GoalTypes";
import { useAppSelector } from "./reduxHooks";

const goalsData: goalData = useAppSelector((state) => state.goals);

export const filterGoalsByType = (type: string): Goal[] => {
  return findByType(type);
};

function findByType(type: string): Goal[] {
  let data = goalsData.find((goalType) => {
    if (goalType.title.includes(type)) return goalType.data;
  })?.data;
  if (data !== undefined) {
    return data;
  }
  return [];
}
