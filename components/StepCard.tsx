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
import { Goal } from "../types/GoalTypes";

type StepCardProps = {
  goal: Goal;
};

const StepCard: React.FC<StepCardProps> = ({ goal }) => {
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

export default StepCard;
