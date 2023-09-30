/** @format */

import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { getAuth } from "firebase/auth";
import {
  NavigationRouteContext,
  useNavigation,
  Route,
} from "@react-navigation/core";
import Card from "../components/Card";
import ProfileCard from "../components/ProfileCard";
import RewardsCard from "../components/RewardsCard";
import LevelsCard from "../components/LevelsCard";
import { useAppSelector } from "../Hooks/reduxHooks";

type homeScreenProps = {
  username: string;
  navigation: any;
};

const HomeScreen: React.FC<homeScreenProps> = ({ username, navigation }) => {
  navigation = useNavigation();
  const auth = getAuth();
  const signOut = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    });
  };

  const step_goals = useAppSelector(
    (state) => state.goals.find((goal) => goal.title === "Daily Steps Goal")!
  );
  const sleep_goals = useAppSelector(
    (state) => state.goals.find((goal) => goal.title === "Daily Sleep Goal")!
  );
  const levels_data = useAppSelector((state) => state.levels);
  const rewards_data = useAppSelector((state) => state.rewards);
  return (
    <ImageBackground
      source={require("../LoginBackground.jpeg")}
      style={styles.image}
    >
      <ScrollView>
        <View style={[styles.container, styles.shadow]}>
          <View style={styles.title_header}>
            <Text style={styles.title}>Welcome {username} !</Text>
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

          <View>
            <Card
              card_title={"Steps"}
              nav_function={() => navigation.navigate("Steps")}
              goalReducer={step_goals}
            />
            <Card
              card_title={"Sleep"}
              nav_function={() => navigation.navigate("Sleep")}
              goalReducer={sleep_goals}
            />
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate("Stats")}
            style={styles.StatsButton}
          >
            <Text style={styles.buttonText}>GO TO STATS</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={signOut} style={styles.button}>
            <Text style={styles.buttonText}>Sign out</Text>
          </TouchableOpacity>
        </View>
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
  //   shadow: {
  //     shadowOffset: {
  //       width: 5,
  //       height: 8,
  //     },
  //     shadowOpacity: 0.1,
  //     shadowRadius: 5,
  //   },
});
