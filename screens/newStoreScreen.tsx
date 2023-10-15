/** @format */

import React, { Dispatch, useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native";

import ItemCard from "../components/itemCard";
import { StoreItem } from "../types/StoreTypes";
import ShopBanner from "../components/ShopScreenBanner";
import ShopComp1 from "../components/ShopComp1";
import ShopComp2 from "../components/ShopComp2";
import ShopComp4 from "../components/ShopComp4";
import { useAppDispatch, useAppSelector } from "../Hooks/reduxHooks";
import { BUY_ITEM } from "../Redux/reducers/StoreReducer";
import { DECREASE_REWARDS } from "../Redux/reducers/rewardsReducer";
import { ADD_ITEM } from "../Redux/reducers/inventoryReducer";

type storeScreenProps = {
  navigation: any
};

const StoreScreen: React.FC<storeScreenProps> = ({navigation}) => {
  const store = useAppSelector(state => state.store);
  const rewards = useAppSelector(state => state.rewards);
  const dispatch = useAppDispatch();
  const buyItem = (itemToBuy: StoreItem) => {
    if (
      rewards.coins < itemToBuy.coins &&
      rewards.jewels < itemToBuy.jewels
    ) {
      alert("Not enough coins and Jewels");
      return;
    } else if (rewards.coins < itemToBuy.coins) {
      alert("Not enough coins");
      return;
    } else if (rewards.jewels < itemToBuy.jewels) {
      alert("Not enough jewels");
      return;
    } else {
      dispatch(BUY_ITEM(itemToBuy));
      dispatch(
        DECREASE_REWARDS({
          coins: itemToBuy.coins,
          jewels: itemToBuy.jewels,
        })
      );
      ADD_ITEM(itemToBuy);
    }
  };

  return (
    <>
      <ShopBanner />
      <ScrollView style={{ backgroundColor: "#F0FFFF" }}>
        <ShopComp1 />
        <ShopComp2 navigation={navigation} />
      </ScrollView>
      <View style={{ backgroundColor: "#A7C7E7" }}>
        <ShopComp4 />
      </View>
      {/* separate */}
      <View>
        <View style={styles.bannerContainer}>
          <Text style={styles.bannerTitle}> ✧ Our Collections ✧</Text>
        </View>
        <View style={{ marginLeft: 10, marginRight: 10 }}>
          <Text style={styles.storeHeader} />

          <View style={styles.rewards}>
            <Text
              style={[
                styles.rewardsText,
                {
                  // borderRigWidth: 1,
                  borderRightWidth: 1,
                  borderRightColor: "#CFCFCF",
                },
              ]}
            >
              Coins: {rewards.coins}
            </Text>
            <Text style={styles.rewardsText}>
              Jewels: {rewards.jewels}
            </Text>
          </View>
        </View>
        <View style={{ backgroundColor: "#F0FFFF" }}>
          <FlatList
            data={store}
            renderItem={({ item }) => (
              <ItemCard item={item} BUY_ITEM={() => buyItem(item)} />
            )}
            keyExtractor={(item) => `${item.id}`}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    padding: 1,
    backgroundColor: "#1B2BA5",
  },
  bannerTitle: {
    // paddingVertical: 8,
    // color: '#FFFFFF',
    // fontSize: 32,
    // textAlign: 'center',
    // fontWeight: 'bold'
    paddingVertical: 8,
    color: "#FFFFFF",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  storeHeader: {
    fontSize: 32,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  rewards: {
    flexDirection: "row",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#CFCFCF",
    paddingBottom: 5,
  },
  rewardsText: {
    flex: 1,
    textAlign: "center",
    marginTop: 10,
    fontSize: 15,
  },
});

// const export default = (state: any): {} => {
//   return {
//     storeReducer: state.storeReducer,
//     rewardsReducer: state.rewardsReducer,
//   };
// };

// const mapDispatchToProps = (dispatch: any): {} => {
//   return {
//     BUY_ITEM: (item: StoreItem) => dispatch(actions.BUY_ITEM(item)),
//     ADD_INVENTORY_ITEM: (item: StoreItem) => dispatch(actions.ADD_ITEM(item)),
//     DECREASE_REWARD: (item: StoreItem) =>
//       dispatch(actions.DECREASE_REWARDS(item)),
//   };
// };

// export default connect(export default, mapDispatchToProps)(StoreScreen);
export default StoreScreen;
