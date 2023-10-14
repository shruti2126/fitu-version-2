/** @format */

import React from "react";
import { View, Text, StyleSheet, ImageBackground, Route } from "react-native";
import SleepCard from "../components/SleepCard";
import SleepDataCard from "../components/SleepDataCard";
import SleepFacts from "../components/SleepFacts";
import { Goal } from "../types/GoalTypes";
// import AnimatedBar from "react-native-animated-bar"

type sleepProps = {
  route: any;
};
const Sleep: React.FC<sleepProps> = ({ route }) => {
  const goals = route.params.goals;
  return (
    <ImageBackground
      source={require("../assets/Better_sleep.png")}
      style={styles.image}
    >
      <View style={styles.container}>
        <SleepDataCard />
        {goals.map((goal: Goal) => {
          <SleepCard goal={goal} />;
        })}
        <SleepFacts />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {},
  image: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    width: "100%",
    height: "100%",
    //blurRadius: 50
  },
});
export default Sleep;
