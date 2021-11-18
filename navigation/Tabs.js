import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet, View, Image, Button, Pressable } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import Movements from "../screens/Movements";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import Community from "../screens/Community/index";

const Tab = createBottomTabNavigator();

const Tabs = ({ navigation }) => {
  const handlesignOut = async () => {
    await updateDoc(doc(db, "users", auth.currentUser.uid), {
      isOnline: false,
    });
    await signOut(auth);
    alert("Sign out!");
    navigation.replace("login");
  };
  return (
    <Tab.Navigator
      initialRouteName="Movements"
      screenOptions={{
        headerTitleAlign: "center",
        tabBarActiveTintColor: "#4FB8E7",
      }}
    >
      <Tab.Screen
        name="Movements"
        component={Movements}
        options={{
          title: "Daily Challange",
          headerStyle: {
            backgroundColor: "#618FC9",
          },

          headerTintColor: "#fff",
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require("../assets/Images/tabbar_icons/movements.png")}
                style={styles.tabIcon}
              />
            </View>
          ),
          headerRight: () => (
            <Pressable style={styles.TabHeaderBtn} onPress={() => alert("add")}>
              <FontAwesome name="plus" size={24} color="white" />
            </Pressable>
          ),
          headerLeft: () => (
            <Pressable style={styles.TabHeaderBtn} onPress={handlesignOut}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </Pressable>
          ),
        }}
      />

      <Tab.Screen
        name="Community"
        component={Community}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require("../assets/Images/tabbar_icons/community.png")}
                style={styles.tabIcon}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  tabIcon: {
    height: 20,
    width: 20,
  },
  TabHeaderBtn: {
    paddingLeft: 15,
    paddingRight: 15,
  },
});
