/** @format */

import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";

import { Goal, goalData } from "../types/GoalTypes";
import { getUserFromAsyncStorage } from "../Hooks/getUserFromAsynStorage";
import { useNavigation } from "@react-navigation/core";
import { Button } from "react-native-elements";

type cardProps = {
  goals: Goal[];
  card_title: string;
};

const Card: React.FC<cardProps> = ({ goals, card_title }) => {
  const [display, setDisplay] = useState("");

  const navigation = useNavigation();
  useEffect(() => {
    goals.forEach((goal) => {
      if (goal.isMainGoal) {
        setDisplay(goal.title);
      } else {
        setDisplay("No Main Goals Yet");
      }
    });
  }, []);

  return (
    <View style={styles.frame}>
      <View style={styles.header}>
        <Text style={styles.heading}>Go to {card_title} Sector</Text>
      </View>
      <Button
        activeOpacity={0.6}
        onPress={() => navigation.navigate(card_title, goals)}
      >
        <View style={styles.container}>
          <Text style={styles.title}>
            Main Goal: <Text style={styles.text_title}>{display}</Text>
          </Text>
        </View>
      </Button>
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
