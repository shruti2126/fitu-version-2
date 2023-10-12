/** @format */

import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { connect } from "react-redux";
import fetchStepGoals from "../Hooks/fetchStepGoals";
import AsyncStorage from "@react-native-async-storage/async-storage";
import fetchSleepGoals from "../Hooks/fetchSleepGoals";
import {
  BorderlessButton,
  TouchableHighlight,
} from "react-native-gesture-handler";
import { Goal, goalData } from "../types/GoalTypes";
import { getUserFromAsyncStorage } from "../Hooks/getUserFromAsynStorage";

type homeScreenProps = {
  goalData: { title: string; data: Goal[] };
  card_title: string;
  nav_function?: () => void;
};

const Card: React.FC<homeScreenProps> = ({
  goalData,
  card_title,
  nav_function,
}) => {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    goalData.data.forEach((goal) => {
      if (goal.isMainGoal) {
        setDisplay(goal.title);
      } else {
        setDisplay("No Main Goals Yet");
      }
    });
  }, [display])

  return (
    <View style={styles.frame}>
      <View style={styles.header}>
        <Text style={styles.heading}>Go to {card_title} Sector</Text>
      </View>
      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="#FFFFA7"
        onPress={nav_function}
      >
        {/* <View style={styles.container}> */}
        {/* <View style={styles.header}>
						<Text style={styles.text_title}>{card_title}</Text>
					</View> */}
        <View style={styles.container}>
          <Text style={styles.title}>
            Main Goal: <Text style={styles.text_title}>{display}</Text>
          </Text>
        </View>
        {/* <View style={styles.body}>
						<Text style={styles.text_body}>Progress:</Text>
					</View> */}
        {/* </View> */}
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    backgroundColor: "oldlace",
    borderRadius: 20,
    // borderBottomWidth: 1,
    // borderBottomColor: '#FFFFFF',
    elevation: 3,
    shadowOffset: {
      width: 5,
      height: 8,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowColor: "#FFFFFF",
    height: 50,
    //width: 350,
    margin: 5,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
    //paddingBottom: 5,
  },
  title: {
    color: "black",
    fontWeight: "600",
    fontSize: 20,
  },
  heading: {
    fontWeight: "700",
    color: "white",
    fontSize: 25,
  },
  frame: {
    alignSelf: "center",
    // backgroundColor: 'oldlace',
    paddingTop: 20,
    //height: 280,
    width: 400,
  },
  header: {
    alignSelf: "center",
  },
  body: {
    alignItems: "flex-start",
    marginTop: 5,
    marginBottom: 10,
  },
  text_title: {
    fontWeight: "400",
    color: "blue",
    fontSize: 20,
    // paddingLeft: 15
  },
  text_body: {
    fontSize: 20,
    marginBottom: 2,
  },
});
export default Card;
