/** @format */

import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import StepCard from "../components/StepCard";
import StepFacts from "../components/StepFacts";
import StepDataCard from "../components/StepDataCard";
import { Route, useNavigation } from "@react-navigation/native";
import { Goal } from "../types/GoalTypes";

type stepsProps = {
  route: any;
  navigation: any;
};

const Steps: React.FC<stepsProps> = ({ route, navigation }) => {
  const goals = route.params.goals;
  return (
    <ImageBackground source={require("../nature.jpg")} style={styles.image}>
      <View style={styles.container}>
        <StepDataCard />
        {goals.map((goal: Goal) => {
          <StepCard goal={goal} />;
        })}
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
