import React, { useState } from "react";
import {
  StyleSheet,
  Image,
  View,
  Text,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { setDoc, doc, Timestamp } from "firebase/firestore";

const RegisterScreen = ({ navigation }) => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const handlesubmit = async () => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await setDoc(doc(db, "users", result.user.uid), {
        uid: result.user.uid,
        name,
        email,
        createdAt: Timestamp.fromDate(new Date()),
        isOnline: false,
      });
      setname("");
      setemail("");
      setpassword("");
      alert("Registered");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.background}>
      <Pressable
        style={styles.HeaderBtn}
        onPress={() => navigation.navigate("onBoardingScreen")}
      >
        <Ionicons name="arrow-back" size={24} color="white" />
      </Pressable>
      <View style={styles.headerContainer}>
        <View style={styles.logoContainer}>
          <View style={styles.registerTextContainer}>
            <Text style={styles.registerText}>Register</Text>
          </View>
          <View>
            <Image source={require("../assets/logo.png")} style={styles.logo} />
          </View>
          <View style={styles.registerTextContainer}>
            <Text></Text>
          </View>
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.InputContainer}>
          <TextInput
            name="name"
            placeholder="Name"
            placeholderTextColor={"#fff"}
            style={styles.Input}
            value={name}
            onChangeText={(name) => {
              setname(name);
            }}
          />
          <FontAwesome name="user" size={24} color="white" />
        </View>
        <View style={styles.InputContainer}>
          <TextInput
            name="email"
            placeholder="Email"
            placeholderTextColor={"#fff"}
            style={styles.Input}
            value={email}
            onChangeText={(email) => {
              setemail(email);
            }}
          />
          <MaterialIcons name="email" size={24} color="white" />
        </View>
        <View style={styles.InputContainer}>
          <TextInput
            name="password"
            placeholder="Password"
            placeholderTextColor={"#fff"}
            style={styles.Input}
            secureTextEntry={true}
            value={password}
            onChangeText={(password) => {
              setpassword(password);
            }}
          />
          <FontAwesome name="lock" size={24} color="white" />
        </View>

        <Pressable style={styles.Button} onPress={handlesubmit}>
          <Text style={styles.ButtonText}> Register </Text>
        </Pressable>
        <Pressable
          style={styles.Button}
          onPress={() => alert("Register with google!")}
        >
          <Text style={styles.ButtonText}> Register with Google </Text>
        </Pressable>
        <Pressable style={styles.ForgetButton} onPress={() => alert("Forget")}>
          <Text style={styles.ForgetButtonText}> FORGET PASSWORD </Text>
        </Pressable>

        <View style={styles.FooterContainer}>
          <Text style={styles.FooterText}>
            By signing up,you are indicating tha you have Read and agree to the{" "}
            <Text style={styles.Span} onPress={() => alert("Terms of service")}>
              Terms of Service
            </Text>{" "}
            and{" "}
            <Text style={styles.Span} onPress={() => alert("privacy policy")}>
              Privacy Policy
            </Text>
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  background: {
    paddingLeft: "10%",
    paddingRight: "10%",
    backgroundColor: "#50B8E7",
    flex: 1,
    alignItems: "center",
  },
  headerContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: "contain",
  },
  HeaderBtn: {
    marginTop: 50,
    alignSelf: "flex-start",
  },
  registerTextContainer: {
    flex: 1,
    flexDirection: "column",
    alignSelf: "flex-end",
  },
  registerText: {
    color: "white",
    fontSize: 15,
    alignSelf: "flex-start",
    marginBottom: 20,
    marginLeft: 30,
  },
  body: {
    backgroundColor: "#50B8E7",
    flex: 3,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  InputContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 5,
    width: "100%",
    borderBottomColor: "#fff",
    borderBottomWidth: 2,
    marginBottom: "6%",
  },
  Input: {
    borderBottomWidth: 0,
    margin: 0,
    width: "94%",
    backgroundColor: "#50B8E7",
    color: "#fff",
    fontSize: 18,
    paddingHorizontal: 0,
  },
  Button: {
    backgroundColor: "#fff",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 12,
    marginTop: "6%",
  },
  ForgetButton: {
    marginTop: "5%",
    borderBottomWidth: 1,
    borderColor: "#fff",
  },
  ForgetButtonText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
  },
  FooterContainer: {
    marginTop: "6%",
    alignSelf: "flex-end",
    alignItems: "center",
    textAlign: "center",
  },
  FooterText: {
    color: "white",
  },
  Span: {
    color: "black",
    fontWeight: "600",
  },
});
