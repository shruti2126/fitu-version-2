/** @format */

import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/core";
import {
  saveUserToFirestore,
  initializeDocsInFirestore,
} from "../Hooks/initDocsInFirestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

type registerScreenProps = {
  navigation: any;
};

const storeData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
    console.log("error saving data");
  }
};

const RegisterScreen: React.FC<registerScreenProps> = ({ navigation }) => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  navigation = useNavigation();
  const auth = getAuth();

  const signUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        if (password.length < 6) {
          setMessage(
            "Your password is too short! Please create password of length >= 6."
          );
        }
        await saveUserToFirestore(username, email);
        await initializeDocsInFirestore(email);
        const obj = { email: email, username: username, password: password };
        storeData("user", JSON.stringify(obj));
        navigation.navigate("Home", username);
        setEmail("");
        setPassword("");
        setUsername("");
      })
      .catch((error) => {
        setMessage(error.message);
        // alert(error.message);
      });
  };
  //const image = {uri: "https://i.stack.imgur.com/cEz3G.jpg"};
  return (
    <ImageBackground
      source={require("../LoginBackground.jpeg")}
      style={styles.image}
    >
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.inputContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.heading}>fitU</Text>
          </View>
          <TextInput
            placeholder="Username"
            onChangeText={setUsername}
            value={username}
            style={styles.input}
          />

          <TextInput
            placeholder="Email"
            onChangeText={setEmail}
            value={email}
            style={styles.input}
          />

          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            secureTextEntry={true}
          />
        </View>
        <Text style={{ color: "red", fontSize: 20, textAlign: "center" }}>
          {message}
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={signUp}
            style={[styles.button, styles.buttonOutline]}
          >
            <Text style={styles.buttonOutlineText}>Register</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba( 0, 0, 0, 0.4)",
  },
  inputContainer: {
    width: "50%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
  text: {
    marginTop: 10,
  },
  titleContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 25,
  },
  heading: {
    fontSize: 100,
    color: "#ecb7bf",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    width: "100%",
    height: "100%",
  },
});
