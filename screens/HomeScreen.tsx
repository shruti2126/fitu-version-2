/** @format */

import React, { useEffect } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  TouchableHighlight,
} from "react-native";
import { getAuth } from "firebase/auth";

import Card from "../components/Card";
import ProfileCard from "../components/ProfileCard";
import RewardsCard from "../components/RewardsCard";
import LevelsCard from "../components/LevelsCard";
import { useAppSelector } from "../Hooks/reduxHooks";
import Sleep from "./Sleep";
import Steps from "./Steps";
import { Goal, goalData, goalReward } from "../types/GoalTypes";
import { level } from "../types/LevelsType";

type homeScreenProps = {
  route: any;
  navigation: any;
};

const HomeScreen: React.FC<homeScreenProps> = ({ route, navigation }) => {
  const auth = getAuth();
  const signOut = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    });
  };

  let steps_goals: Goal[] = useAppSelector(
    (state) =>
      state.goals.find((goal) => goal.title === "Daily Steps Goal")!.data
  );
  let sleep_goals: Goal[] = useAppSelector(
    (state) =>
      state.goals.find((goal) => goal.title === "Daily Sleep Goal")!.data
  );
  let levels_data: level = useAppSelector((state) => state.levels);
  let rewards_data: goalReward = useAppSelector((state) => state.rewards);

  return (
    <ImageBackground
      source={require("../LoginBackground.jpeg")}
      style={styles.image}
    >
      <ScrollView>
        <View style={[styles.container, styles.shadow]}>
          <View style={styles.title_header}>
            <Text style={styles.title}>Welcome {route.params} !</Text>
          </View>

          <ProfileCard />
          <LevelsCard
            currentLevel={levels_data.currentLevel}
            experienceToComplete={levels_data.experienceToComplete}
          />
          <RewardsCard
            coins={rewards_data.coins}
            jewels={rewards_data.jewels}
          />
        </View>
        <Card card_title={"Steps"} goals={steps_goals} />
        <Card card_title={"Sleep"} goals={sleep_goals} />
        <TouchableOpacity
          onPress={() => navigation.navigate("Stats")}
          style={styles.StatsButton}
        >
          <Text style={styles.buttonText}>GO TO STATS</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={signOut} style={styles.button}>
          <Text style={styles.buttonText}>Sign out</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: '#FFFFFF'
    // backgroundColor: 'aliceblue'
    backgroundColor: "rgba( 0, 0, 0, 0.6 )",
  },
  shadow: {
    shadowOffset: {
      width: 10,
      height: 8,
    },
    shadowOpacity: 0.6,
    shadowRadius: 5,
    shadowColor: "white",
  },
  title: {
    color: "white",
    fontWeight: "700",
    fontSize: 30,
    marginBottom: 10,
  },
  title_header: {
    textAlign: "center",
    marginTop: 25,
  },
  row: {
    flex: 1,
    justifyContent: "space-between",
    // alignItems: 'center',
    alignContent: "space-between",
    flexDirection: "row",
    // backgroundColor: '#FFFFFF'
    // backgroundColor: 'aliceblue'
  },
  StatsButton: {
    backgroundColor: "#e1ad01",
    width: "80%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#187bcd",
    width: "60%",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 30,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    width: "100%",
    height: "100%",
  },
});
