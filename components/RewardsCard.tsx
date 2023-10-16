/** @format */

import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { Store } from "../types/StoreTypes";
import { useAppSelector } from "../Hooks/reduxHooks";


type RewardsProps = {
  coins?: number;
  jewels?: number;
  navigation: any
};

const rewardsCard: React.FC<RewardsProps> = ({ coins, jewels, navigation }) => {
  
  let rewards = useAppSelector(state => state.rewards)
  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>Rewards</Text>
      <Text style={styles.textBody}>Coins: {coins}</Text>
      <Text style={styles.textBody}>Jewels: {jewels}</Text>

      <View style={styles.storeButton}>
        <Button
          title="Visit Store"
          onPress={() => navigation.navigate("Store",  rewards)}
          color="##e1ad01"
        />
        {/* <Button title="Visit Store" onPress={() => navigation.navigate('Shop')} color="#f194ff" /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    backgroundColor: "oldlace",
    borderRadius: 20,
    height: 170,
    width: 350,
    margin: 10,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
  },
  textTitle: {
    color: "#1F283A",
    fontWeight: "700",
    fontSize: 25,
    // paddingLeft: 15
  },
  textBody: {
    fontSize: 18,
    marginBottom: 5,
    marginTop: 5,
  },

  storeButton: {
    backgroundColor: "#e1ad01",
    //width: '70%',
    padding: 5,
    borderRadius: 10,
    //alignItems: 'center',
    marginTop: 10,
  },
});

// const export default = (state: any) => {
// 	return {
// 		coins: state.rewardsReducer.coins,
// 		jewels: state.rewardsReducer.jewels
// 	};
// };

export default rewardsCard;
