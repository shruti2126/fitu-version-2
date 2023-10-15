/** @format */

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Route,
  FlatList,
  SafeAreaView,
} from "react-native";
import SleepCard from "../components/SleepCard";
import SleepDataCard from "../components/SleepDataCard";
import SleepFacts from "../components/SleepFacts";

// import AnimatedBar from "react-native-animated-bar"

type sleepProps = {
  route: any;
};
const Sleep: React.FC<sleepProps> = ({ route }) => {
  const goals = route.params;
  console.log("sleep goals in Sleep screen = ", goals);
  return (
    <ImageBackground
      source={require("../assets/Better_sleep.png")}
      style={styles.image}
    >
      <Text style={styles.title}> Everything Sleep </Text>{" "}
      <View style={styles.container}>
        <SleepDataCard />
        <SafeAreaView>
          <FlatList
            data={goals}
            renderItem={({ item }) => <SleepCard goal={item} />}
            keyExtractor={(item, index) => `${item.index}`}
          />
        </SafeAreaView>
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
  title: {
    color: "white",
    fontWeight: "600",
    fontSize: 50,
    textAlign: "center",
  },
});
export default Sleep;
