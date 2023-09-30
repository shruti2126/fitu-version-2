/** @format */

import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  Image,
  FlatList,
  Button,
} from "react-native";
import { getAuth } from "firebase/auth";
import { useNavigation } from "@react-navigation/core";
import Goals from "../screens/GoalsScreen";



const ProfileCard = () => {
  const auth = getAuth();
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.progress}>
        <Text style={styles.textTitle}>Today's Progress</Text>
      </View>
      <View style={styles.progress}>
        <Text style={styles.progressBody}>Steps Walked: 5000</Text>
      </View>
      <View style={styles.progress}>
        <Text style={styles.progressBody}>Hours Slept Last night: 6</Text>
      </View>

      {/* <Text style={[ styles.textTitle, { marginTop: 140 } ]}>Daily Goals</Text>

			<View style={styles.dailyGoal}>
				<Text style={styles.progressBody}>Goal 2 </Text>
				<Text style={styles.progressBody}>Goal 1 </Text>
				<Text style={styles.progressBody}>Goal 3 </Text>
			</View> */}
      <View style={styles.goalButton}>
        <Button
          title="View goals"
				  onPress={() => navigation.navigate("Goals")}
          color="#e1ad01"
        />
      </View>
      {/* <Pressable style={styles.text_body} onPress={goal_navigation}>
				<Text style={styles.toGoals}> Click to Goals </Text>
			</Pressable> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    backgroundColor: "oldlace",
    borderRadius: 20,
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    // height: 500,
    height: 170,
    width: 350,
    margin: 10,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
  },
  goalButton: {
    backgroundColor: "#e1ad01",
    //width: '70%',
    padding: 2,
    borderRadius: 10,
    //alignItems: 'center',
    marginTop: 10,
  },
  progress: {
    marginTop: 10,
  },
  dailyGoal: {
    marginTop: 15,
  },
  progressBody: {
    fontSize: 18,
    marginBottom: 2,
  },
  toGoals: {
    marginBottom: 10,
    paddingLeft: 0,
  },
  profileHeader: {
    textAlign: "center",
    marginBottom: 20,
  },
  body: {
    marginTop: 7,
  },
  textTitle: {
    color: "#1F283A",
    fontWeight: "700",
    fontSize: 25,
    // paddingLeft: 15
  },
});

export default ProfileCard;
