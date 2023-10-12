/** @format */

import { Reducer } from "redux";

export type goalReward = {
  coins: number;
  jewels: number;
};

export type Goal = {
  index: number; //string format: epoch time as created by new Date().getTime();
  isMainGoal: boolean;
  goalIsSteps: boolean;
  title: string;
  note?: string;
  difficulty?: number;
  rewards: goalReward;
  // reminder?: Date;
};

export type goalData = {
  title: string;
  data: Goal[];
}[];

export type reducer = {
  state: {};
  action: { type: String; payload: Object };
};

export type MainGoal = {
  difficulty: number, 
  goalIsSteps: BooleanConstructor, 
  index: number, 
  isMainGoal: boolean, 
  note: string, 
  rewards: goalReward, 
  title: string
}