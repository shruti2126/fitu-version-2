/** @format */

import React, { useEffect, useState, Component } from "react";
import {
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { getUserFromAsyncStorage } from "../Hooks/getUserFromAsynStorage";
import fetchUsername from "../db/queries/auth/fetchUsername";

type loginScreenProps = {
  navigation: any;
};

const LoginScreen: React.FC<loginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  navigation = useNavigation();
  const auth = getAuth();

  const login = async () => {
    // try {
    //   await getUserFromAsyncStorage().then((value) => {
    //     if (value !== null && value["username"] !== null) {
    //       console.log(value["username"]);
    //       setEmail(value["email"]);
    //       setPassword(value["password"]);
    //       navigation.navigate("Home", value["username"]);
    //     }
    //   });
    // } catch (err) {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        let user = userCredential.user;
        if (user !== undefined) {
          let userEmail = user.email;
          if (userEmail !== null) {
            setEmail(userEmail);
            await fetchUsername(email).then((username) => {
              if (username !== null) navigation.navigate("Home", username);
              else
                setMessage(
                  "Sorry! Couldn't find your account. Please try signing in again or register a new account."
                );
            });
          }
        }
        setEmail(userCredential.user.email!);
      })
      .catch((error) => {
        setMessage("Invalid Email or Password! Please try again!");
      });
  };

  //https://i.stack.imgur.com/cEz3G.jpg
  //const image = {uri: "Desktop/capstone/fitU/05922414-04D4-47E7-98EF-76C789A404B4.jpeg"};
  return (
    <ImageBackground
      source={require("../LoginBackground.jpeg")}
      style={styles.image}
    >
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.titleContainer}>
          <Text style={styles.heading}>fitU</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            onChangeText={(email) => setEmail(email.toLowerCase())}
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

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={login} style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <Text style={styles.message}> {message} </Text>
          <Text style={styles.text}>New user?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Register");
            }}
            style={[styles.registerButton, styles.buttonOutline]}
          >
            <Text style={styles.buttonOutlineText}>Register</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba( 0, 0, 0, 0.6)",
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
  registerButton: {
    width: "50%",
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
    color: "white",
  },
  message: {
    fontSize: 30,
    color: "red",
    marginTop: 10,
    marginBottom: 10,
    textAlign: "center",
  },
  titleContainer: {
    width: "60%",
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

export default LoginScreen;
