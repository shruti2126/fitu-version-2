/** @format */

import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import StepCard from "../components/StepCard";
import StepFacts from "../components/StepFacts";
import StepDataCard from "../components/StepDataCard";
import { Route, useNavigation } from "@react-navigation/native";

type stepsProps = {
  route: Route<string>;
  navigation: any;
};

const Steps: React.FC<stepsProps> = ({ route, navigation }) => {
  navigation = useNavigation();
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
        <StepCard goalReducer={[]} />
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
