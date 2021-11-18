import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { db, auth } from "../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

const HomeScreen = () => {
  const [users, setusers] = useState([]);
  useEffect(() => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("uid", "not-in", [auth.currentUser.uid]));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });

      setusers(users);
    });
    return () => unsub;
  }, []);

  console.log(users);
  return (
    <View style={styles.container}>
      <Text>I am home</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4FB8E7",
    alignItems: "center",
    justifyContent: "center",
  },
});
