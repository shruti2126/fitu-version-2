/** @format */

import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import StepCard from "../components/StepCard";
import StepFacts from "../components/StepFacts";
import StepDataCard from "../components/StepDataCard";
import { Route, useNavigation } from "@react-navigation/native";
import { Goal } from "../types/GoalTypes";

type stepsProps = {
  steps_goal: Goal;
  navigation: any
};

const Steps: React.FC<stepsProps> = ({ steps_goal, navigation }) => {
  return (
    <ImageBackground source={require("../nature.jpg")} style={styles.image}>
      <View style={styles.container}>
        {/* <AnimatedBar 
				    progress={30}
					height={50}
					borderColor="#DDD"
					fillColor="tomato"
					barColor="red"
					borderRadius={5}/> */}

        <StepDataCard />
        <StepCard goal={steps_goal} />
        <StepFacts />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    width: "100%",
    height: "100%",
    //blurRadius: 50
  },
});

export default Steps;
