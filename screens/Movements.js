import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableHighlight,
} from "react-native";
import { Button } from "react-native-elements";
import { db, auth } from "../firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  setDoc,
  doc,
  Timestamp,
} from "firebase/firestore";

const Movements = () => {
  const [task, setTask] = useState("No Task");

  const Completed = async (e) => {
    e.preventDefault();
    try {
      const res = "Completed!";
      const time = Timestamp.fromDate(new Date());
      await setDoc(doc(db, "Responses", auth.currentUser.uid), {
        createdAt: time,
        response: res,
      });
      alert("You Have Completed The Task!");
    } catch (err) {
      alert(err);
    }
  };

  const Accept = async (e) => {
    e.preventDefault();
    try {
      const res = "Accepted!";
      const time = Timestamp.fromDate(new Date());
      await setDoc(doc(db, "Responses", auth.currentUser.uid), {
        createdAt: time,
        response: res,
      });
      alert("You Have Accepted The Task!");
    } catch (err) {
      alert(err);
    }
  };

  const Later = async (e) => {
    e.preventDefault();
    try {
      const res = "I Will Do It Later";
      const time = Timestamp.fromDate(new Date());
      await setDoc(doc(db, "Responses", auth.currentUser.uid), {
        createdAt: time,
        response: res,
      });
      alert("You Will Do It Later!");
    } catch (err) {
      alert(err);
    }
  };

  const Dont = async (e) => {
    e.preventDefault();
    try {
      const res = "I Will Not Do This Task";
      const time = Timestamp.fromDate(new Date());
      await setDoc(doc(db, "Responses", auth.currentUser.uid), {
        createdAt: time,
        response: res,
      });
      alert("Rejected!");
    } catch (err) {
      alert(err);
    }
  };

  useEffect(async () => {
    const tasksRef = collection(db, "tasks");
    const q = query(tasksRef, where("name", "!=", "No Task"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setTask(doc.data().name);
      });
    });
    return () => unsub;
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ display: "flex", flex: 1, alignItems: "center" }}>
        <Text style={{ fontSize: 25, fontWeight: "bold", marginTop: "10%" }}>
          WHAT'S ON TODAY ?
        </Text>
        <Text style={{ fontSize: 13, margin: 10, color: "#DAD8D8" }}>
          Tab to accept your daily challange{" "}
        </Text>
        <TouchableHighlight
          style={{
            borderRadius:
              Math.round(
                Dimensions.get("window").width + Dimensions.get("window").height
              ) / 2,
            width: Dimensions.get("window").width * 0.7,
            height: Dimensions.get("window").width * 0.7,
            backgroundColor: "#F79F09",
            borderColor: "#fff",
            borderWidth: 10,
            justifyContent: "center",
            alignItems: "center",
            padding: 5,
          }}
          underlayColor="#FFF"
          onPress={Completed}
        >
          <Text
            style={{
              color: "#fff",
              fontWeight: "bold",
              fontSize: 20,
              textAlign: "center",
            }}
          >
            {task}{" "}
          </Text>
        </TouchableHighlight>
      </View>
      <View
        style={{
          display: "flex",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "15%",
        }}
      >
        <TouchableHighlight
          style={styles.btn}
          underlayColor="#FFF"
          onPress={Accept}
        >
          <Text>I Accept</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.btn2}
          underlayColor="#618FC9"
          onPress={Later}
        >
          <Text> Maybe Later </Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.btn2}
          underlayColor="#618FC9"
          onPress={Dont}
        >
          <Text> I don't want to do this </Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default Movements;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4FB8E7",
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    width: Dimensions.get("window").width * 0.7,
    height: 40,
    backgroundColor: "#618FC9",
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  btn2: {
    width: Dimensions.get("window").width * 0.7,
    height: 40,
    backgroundColor: "#FFF",
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
});
