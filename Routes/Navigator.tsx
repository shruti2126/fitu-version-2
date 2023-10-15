/** @format */

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import RegisterScreen from "../screens/RegisterScreen";
// import StoreScreen from '../screens/StoreScreen';
import Steps from "../screens/Steps";
import Sleep from "../screens/Sleep";
import Goals from "../screens/GoalsScreen";
import ShopScreen from "../screens/ShopScreen";
import Stats from "../screens/StatsScreen";
import CorrelationSleep from "../screens/CorrelationSleep";
import CorrelationStep from "../screens/CorrelationStep";
import StoreScreen from "../screens/newStoreScreen";
import StepCard from "../components/StepCard";

const MainStack = createStackNavigator();

const MainNavigator: React.FC = () => {
  const { Navigator, Screen } = MainStack;

  return (
    <Navigator>
      <Screen name="Login" component={LoginScreen} />
      <Screen name="Home" component={HomeScreen} />
      <Screen name="Register" component={RegisterScreen} />
      {/* <Screen name="Store" component={StoreScreen} /> */}
      <Screen name="Store" component={StoreScreen} />
      <Screen name="Steps" component={Steps} />
      <Screen name="StepsCard"component={StepCard} />
      <Screen name="Sleep" component={Sleep} />
      <Screen name="Goals" component={Goals} />
      <Screen name="Shop" component={ShopScreen} />
      <Screen name="Stats" component={Stats} />
      <Screen name="Sleep-Weight" component={CorrelationSleep} />
      <Screen name="Step-Weight" component={CorrelationStep} />
    </Navigator>
  );
};

export default MainNavigator;
