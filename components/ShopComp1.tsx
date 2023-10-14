/** @format */

import React from "react";
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  Dimensions,
} from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

interface Props {}

const ShopComp1: React.FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/rewardStar.png")}
        style={styles.backgroundImage}
        imageStyle={{
          resizeMode: "cover", //cover?  strech?
        }}
      >
        <Text style={styles.text}>{`Keep up with your goals!
                Claim your free rewards!
        `}</Text>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    height: "100%",
    width: "100%",
    textAlign: "left",
    backgroundColor: "#6495ED",
  },
  text: {
    color: "#00000",
    fontSize: 20,
    fontWeight: "bold",
    width: screenWidth / 4,
  },
  backgroundImage: {
    flex: 1,
    height: "100%",
    width: "100%",
    paddingVertical: "10%",
  },
});

export default ShopComp1;
