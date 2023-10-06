/** @format */

//import { Text } from  'react-native-elements'
import React, { useState } from "react";
import {
  FlatList,
  ImageBackground,
  SectionList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { connect } from "react-redux";
import { goalData, Goal } from "../types/GoalTypes";

type StepCardProps = {
  goal: Goal;
  navigation: any
};

const StepCard: React.FC<StepCardProps> = ({ goal, navigation }) => {
  // 	var displayData: Goal = {
  //     index: 0,
  //     isMainGoal: false,
  //     goalIsSteps: false,
  //     title: "",
  //     rewards: {
  //       coins: 0,
  //       jewels: 0,
  //     },
  //   };
  //   let goals = goalReducer[0].data;

  //   goals.forEach((goal) => {
  //     if (goal != null && goal.isMainGoal) {
  //       displayData = goal;
  //     }
  //   });
  // 	console.log('display data = ', displayData);

  return (
    <View style={styles.container}>
      <View>
        <View>
          <Text style={styles.title}>{goal.title}</Text>
          {goal.isMainGoal ? (
            <Text style={styles.header}> Main Goal: </Text>
          ) : (
            <Text style={styles.header}> Goal: </Text>
          )}
          {/* <Text style={styles.item}>{displayData.title}</Text> */}
          <Text style={styles.header}> Note-to-self:</Text>
          <Text style={styles.item}> {goal.note}</Text>
          <Text style={styles.header}> Difficulty of Goal: </Text>
          <Text style={styles.item}> {goal.difficulty}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "oldlace",
    borderRadius: 10,
    paddingLeft: 15,
    marginBottom: 7,
    marginTop: 10,
  },
  shadow: {
    shadowOffset: {
      width: 5,
      height: 8,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  title: {
    color: "black",
    fontWeight: "700",
    fontSize: 32,
  },
  item: {
    backgroundColor: "#ffe4c4",
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    fontSize: 15,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "#ffe4c4",
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
});

// const export default = (state: any) => {
// 	return {
// 		goalReducer: state.goalReducer
// 	};
// };

export default StepCard;
