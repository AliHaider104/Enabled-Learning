import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native";
import { db, auth } from "../../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

import CommunityUserComponent from "../../components/CommunityUserComponent/CommunityUserComponent";

const CommunityScreen = ({ navigation }) => {
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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.Header}>
          <Text style={styles.HeaderTitle}>Community</Text>
        </View>
        <ScrollView>
          {users.map((user) => (
            <View key={user.uid}>
              <CommunityUserComponent username={user.name} uid={user.uid} />
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default CommunityScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#50B8E7",
  },
  Header: {
    width: "100%",
    padding: 10,
    alignItems: "center",
    textAlign: "center",
    backgroundColor: "#fff",
  },
  HeaderTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
