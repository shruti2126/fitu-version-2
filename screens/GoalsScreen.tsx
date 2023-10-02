/** @format */

import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  Platform,
  Modal,
  Alert,
  Pressable,
  TextInput,
  Button,
  Switch,
} from "react-native";
import CircleButton from "../components/CircleButton";

import { goalReward, Goal, goalData } from "../types/GoalTypes";
import GoalCard from "../components/GoalCard";
import { useAppDispatch, useAppSelector } from "../Hooks/reduxHooks";
import {
  ADD_GOAL,
  DELETE_GOAL,
  UPDATE_GOAL,
  getAllGoalData,
} from "../Redux/reducers/goalReducer";
import { PROGRESS_LEVEL, LEVEL_UP } from "../Redux/reducers/levelsReducer";
import { INCREASE_REWARDS } from "../Redux/reducers/rewardsReducer";
import saveGoalsToFirestore from "../Hooks/saveGoalsToFirestore";

const Goals = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isNewGoalTypeSteps, setIsNewGoalTypeSteps] = useState<boolean>(true);
  const [newGoalTitle, setNewGoalTitle] = useState<string>("");
  const [newGoalNote, setNewGoalNote] = useState<string>("");
  const [newGoalDifficulty, setNewGoalDifficulty] = useState<number>(1);
  const [isEnabled, setIsEnabled] = useState<boolean>(false); // isMainGoal attribute
  const [isUpdating, setIsUpdating] = useState<{
    updating: boolean;
    prevGoal?: Goal; //used to restore the previous goal values while updating a goal
  }>({
    updating: false,
  });
  const dispatch = useAppDispatch();
  let goalsData: goalData = useAppSelector((state) => state.goals);

  useEffect(() => {
    dispatch(getAllGoalData());
  }, []);

  const setGoalStates = (
    isSteps: boolean = true,
    isSwitchEnabled: boolean = false,
    title: string = "",
    note: string = "",
    difficulty: number = 1,
    rewards?: goalReward
  ): void => {
    if (!rewards) {
      rewards = {
        coins: newGoalDifficulty * 2,
        jewels: 0,
      };
    }
    setIsNewGoalTypeSteps(isSteps);
    setIsEnabled(isSwitchEnabled);
    setNewGoalTitle(title);
    setNewGoalNote(note);
    setNewGoalDifficulty(difficulty);
  };

  const mainGoalExists = (): boolean => {
    let doesExist = false;
    if (isNewGoalTypeSteps) {
      goalsData[0].data.forEach((goal: Goal) => {
        if (goal.isMainGoal) {
          alert("Steps main Goal already exists");
          doesExist = true;
        }
      });
    } else {
      goalsData[1].data.forEach((goal: Goal) => {
        if (goal.isMainGoal) {
          alert("Sleep main Goal already exists");
          doesExist = true;
        }
      });
    }
    return doesExist;
  };

  const toggleSwitch = (): void => {
    if (mainGoalExists() && !isEnabled) {
      setIsEnabled(false);
      return;
    }
    if (!mainGoalExists() && isEnabled) {
      setIsEnabled(false);
      return;
    } else if (!mainGoalExists()) {
      setIsEnabled(true);
      return;
    }
  };

  const createGoal = () => {
    console.log("creating new Goal...");
    let newRewards: goalReward;
    if (isEnabled) {
      newRewards = {
        coins: 0,
        jewels: newGoalDifficulty,
      };
    } else {
      newRewards = {
        coins: newGoalDifficulty * 2,
        jewels: 0,
      };
    }

    //check is for updating a goal, the cancel will call createGoal with the previous goal values
    //passed as the newGoal argument.  otherwise we will create a goal based on the current states
    if (!isUpdating.updating) {
      let newGoal: Goal = {
        index: new Date().getTime(),
        goalIsSteps: isNewGoalTypeSteps,
        isMainGoal: isEnabled,
        title: newGoalTitle,
        note: newGoalNote,
        difficulty: newGoalDifficulty,
        rewards: newRewards,
      };
      dispatch(ADD_GOAL(newGoal));

      setModalVisible(false);
    } else {
      setGoalStates(); //reset the states for goals to init values
      setModalVisible(false);
    }
  };

  const findGoal = (index: number, goalIsSteps: boolean): Goal => {
    let currentGoal;
    if (goalIsSteps) {
      currentGoal = goalsData[0].data.find(
        (goal: Goal) => goal.index === index
      );
      console.log("current steps goal = ", currentGoal);
    } else {
      currentGoal = goalsData[1].data.find(
        (goal: Goal) => goal.index === index
      );
    }
    return currentGoal!;
  };

  const updateGoal = (index: number, goalIsSteps: boolean): void => {
    let currentGoal = findGoal(index, goalIsSteps);
    if (!currentGoal) {
      alert("goal not found");
      return;
    }

    setIsUpdating({
      updating: true,
      prevGoal: currentGoal,
    });
    setGoalStates(
      currentGoal.goalIsSteps,
      currentGoal.isMainGoal,
      currentGoal.title,
      currentGoal.note,
      currentGoal.difficulty,
      currentGoal.rewards
    );
    setModalVisible(true);
    console.log("hi");
    dispatch(UPDATE_GOAL(currentGoal));
  };

  const deleteGoal = (index: number, goalIsSteps: boolean): void => {
    let currentGoal = findGoal(index, goalIsSteps);
    if (!currentGoal) {
      alert("goal not found");
      return;
    }

    dispatch(DELETE_GOAL(currentGoal));
  };

  const completeGoal = (index: number, goalIsSteps: boolean): void => {
    let currentGoal = findGoal(index, goalIsSteps);
    if (!currentGoal) {
      alert("goal not found");
      return;
    }

    dispatch(PROGRESS_LEVEL(currentGoal));
    dispatch(LEVEL_UP());

    if (currentGoal.isMainGoal)
      dispatch(
        INCREASE_REWARDS({
          coins: 0,
          jewels: currentGoal.rewards.jewels,
        })
      );
    else
      dispatch(
        INCREASE_REWARDS({
          coins: currentGoal.rewards.coins,
          jewels: 0,
        })
      );
    dispatch(DELETE_GOAL(currentGoal));
  };

  return (
    <View style={styles.container}>
      <Modal
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>New Goal</Text>

            <Text style={styles.modalText}>Type of Goal</Text>
            <View style={styles.goalType}>
              <Button
                title="Steps"
                onPress={() => setIsNewGoalTypeSteps(true)}
              />
              <Button
                title="Sleep"
                onPress={() => setIsNewGoalTypeSteps(false)}
              />
            </View>

            <View style={styles.mainGoal}>
              <Text style={styles.modalText}>Set main goal?</Text>
              <Switch
                style={styles.mainGoalSwitch}
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => toggleSwitch()}
                value={isEnabled}
              />
              {/* <Text style={{ color: "red", fontSize: 10 }}>{errorMsg}</Text> */}
            </View>

            <Text style={styles.modalText}>Title</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={setNewGoalTitle}
              value={newGoalTitle}
            />

            <Text style={styles.modalText}>Notes</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={setNewGoalNote}
              value={newGoalNote}
            />

            <Text style={styles.modalText}>Difficulty</Text>
            <View style={styles.difficulty}>
              <Button title="1" onPress={() => setNewGoalDifficulty(1)} />
              <Button title="2" onPress={() => setNewGoalDifficulty(2)} />
              <Button title="3" onPress={() => setNewGoalDifficulty(3)} />
              <Button title="4" onPress={() => setNewGoalDifficulty(4)} />
              <Button title="5" onPress={() => setNewGoalDifficulty(5)} />
            </View>

            {/* <Text style={styles.modalText}>Add Reminder</Text> */}

            <View style={styles.goalClose}>
              <Pressable
                style={styles.buttonModalClose}
                onPress={() => {
                  console.log(goalsData);

                  console.log(isUpdating);

                  setIsUpdating({ updating: false });

                  //   setGoalStates();
                  //   setModalVisible(false);
                }}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </Pressable>

              <Pressable
                style={styles.buttonModalClose}
                onPress={() => createGoal()}
              >
                <Text style={styles.buttonText}>Save</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <SectionList
        sections={goalsData}
        keyExtractor={(item) => `${item.index}`}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.goalHeader}>{title}</Text>
        )}
        renderItem={({ item }) => (
          <GoalCard
            updateGoal={updateGoal}
            deleteGoal={deleteGoal}
            completeGoal={completeGoal}
            index={item.index}
            isMainGoal={item.isMainGoal}
            goalIsSteps={item.goalIsSteps}
            title={item.title}
            note={item.note}
          />
        )}
      />

      <View style={styles.bottomView}>
        <CircleButton
          text="Btn-4"
          size={70}
          color="#00bcd4"
          textColor="white"
          margin={10}
          fontSize={20}
          source={{ uri: "./plus.png" }}
          onPress={() => setModalVisible(!modalVisible)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 20 : 0,
    marginHorizontal: 16,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
  },
  goalHeader: {
    fontSize: 32,
    margin: 10,
  },
  bottomView: {
    width: "100%",
    height: 50,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    bottom: 0,
  },
  modalView: {
    flex: 1,
    justifyContent: "center",
    marginTop: 22,
  },
  modalContent: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    // alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 40,
  },
  modalText: {
    marginBottom: 5,
    textAlign: "left",
    fontSize: 15,
  },
  buttonModalClose: {
    backgroundColor: "#2196F3",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  textInput: {
    height: 40,
    marginTop: 5,
    marginBottom: 5,
    borderWidth: 1,
    padding: 10,
  },
  mainGoal: {
    flexDirection: "row",
  },
  mainGoalSwitch: {
    // justifyContent: 'flex-end'
    // alignContent: 'space-between'
    marginLeft: 60,
  },
  goalType: {
    flexDirection: "row",
    justifyContent: "center",
  },
  difficulty: {
    flexDirection: "row",
    justifyContent: "center",
  },
  goalClose: {
    flexDirection: "row",
    justifyContent: "center",
  },
});

// const export default = (state: any) => {
//   return {
//     goalsData: state.goalReducer,
//     inventory: state.inventoryReducer,
//     levels: state.levelsReducer,
//   };
// };

// const mapDispatchToProps = (dispatch: any) => {
//   return {
//     ADD_GOAL: (newGoal: Goal) => dispatch(actions.ADD_GOAL(newGoal)),
//     DELETE_GOAL: (currentGoal: Goal) =>
//       dispatch(actions.DELETE_GOAL(currentGoal)),
//     INCREASE_REWARDS: (rewards: {
//       rewardType: string;
//       amount: number;
//       effect: ItemEffect;
//     }) => dispatch(actions.INCREASE_REWARDS(rewards)),
//     ADD_INVENTORY_ITEM: (item: StoreItem) => dispatch(actions.ADD_ITEM(item)),
//     PROGRESS_LEVEL: (goal: Goal) => dispatch(actions.PROGRESS_LEVEL(goal)),
//     LEVEL_UP: () => dispatch(actions.LEVEL_UP()),
//   };
// };

// export default connect(export default, mapDispatchToProps)(Goals);
export default Goals;
