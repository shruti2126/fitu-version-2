/** @format */

import React from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";

const StatsFacts = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.item}>
        Research shows a statitical significant correlation relationship between
        sleep quality and step counts per day. Multilevel model reveals that
        controlling for age, sex, and living conditions, as researhch
        participants accumulated more daily steps than average, they report
        significantly better sleep quality (P=0.05) and longer sleep duration
        (P=0.04).
      </Text>
      <Image
        source={require("../assets/Sleep_Steps.png")}
        style={styles.common}
      />
      <Text style={styles.item}>
        Relationship between daily steps and sleep quality
      </Text>
    </View>
  );
};

export default StatsFacts;

const styles = StyleSheet.create({
  container: {
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: "oldlace",
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 15,
    marginBottom: 5,
    marginTop: 5,
    justifyContent: "space-between",
    alignItems: "center",
  },
  common: {
    width: 320,
    height: 200,
  },
  title: {
    color: "black",
    fontWeight: "700",
    fontSize: 32,
  },
  item: {
    //backgroundColor: '#ffe4c4',
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 5,
    borderRadius: 10,
    alignContent: "space-between",
    justifyContent: "space-between",
  },
});
