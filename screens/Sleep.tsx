/** @format */

import React from "react";
import { View, Text, StyleSheet, ImageBackground, Route } from "react-native";
import SleepCard from "../components/SleepCard";
import SleepDataCard from "../components/SleepDataCard";
import SleepFacts from "../components/SleepFacts";
import { Goal } from "../types/GoalTypes";
// import AnimatedBar from "react-native-animated-bar"

type sleepProps = {
  sleep_goal: Goal;
};
const Sleep: React.FC<sleepProps> = ({ sleep_goal }) => {
  return (
    <ImageBackground
      source={require("../Better_sleep.png")}
      style={styles.image}
    >
      <View style={styles.container}>
        {/* <AnimatedBar 
				    progress={30}
					height={50}
					borderColor="#DDD"
					fillColor="tomato"
					barColor="red"
					borderRadius={5}/> */}
        <SleepDataCard />
        <SleepCard goal={sleep_goal} />
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
