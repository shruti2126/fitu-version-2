/** @format */

import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Button } from "react-native";
import { connect } from "react-redux";
import { level } from "../types/LevelsType";

type LevelsProps = {
  currentLevel: number;
  experienceToComplete: number;
};

const LevelsCard: React.FC<LevelsProps> = ({
  currentLevel,
  experienceToComplete,
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>Level {currentLevel}</Text>
      <Text style={styles.textBody}>
        Experience to Complete: {experienceToComplete}
      </Text>

      {/* <View style={styles.storeButton}>
				<Button title="Visit Store" onPress={() => navigation.navigate('Shop')} color="#f194ff" />
			</View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    backgroundColor: "oldlace",
    borderRadius: 20,
    height: 100,
    width: 350,
    margin: 10,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
  },
  textTitle: {
    color: "#1F283A",
    fontWeight: "700",
    fontSize: 25,
    marginBottom: 5,
    // paddingLeft: 15
  },
  textBody: {
    fontSize: 18,
    marginBottom: 5,
  },

  storeButton: {
    marginTop: 20,
  },
});

// const export default = (state: any) => {
// 	const levelsReducer: level = state.levelsReducer;

// 	return {
// 		currentLevel: levelsReducer.currentLevel,
// 		experienceToComplete: levelsReducer.experienceToComplete
// 	};
// };

// export default connect(export default)(rewardsCard);
export default LevelsCard;
