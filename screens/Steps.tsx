/** @format */

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  FlatList,
  SectionList,
} from "react-native";
import StepCard from "../components/StepCard";
import StepFacts from "../components/StepFacts";
import StepDataCard from "../components/StepDataCard";
import { Goal } from "../types/GoalTypes";

type stepsProps = {
  route: any;
  navigation: any;
};

const Steps: React.FC<stepsProps> = ({ route, navigation }) => {
  const goals: Goal[] = route.params;

  return (
    <ImageBackground source={require("../nature.jpg")} style={styles.image}>
      <Text style={styles.title}> Everything Steps </Text>
      <View style={styles.container}>
        <StepDataCard />
        <SafeAreaView>
          <FlatList
            data={goals}
            renderItem={({ item }) => <StepCard goal={item} />}
            keyExtractor={(item, index) => `${item.index}`}
          />
        </SafeAreaView>
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
  title: {
    color: "white",
    fontWeight: "600",
    fontSize: 50,
    textAlign: "center"
  },
});

export default Steps;
