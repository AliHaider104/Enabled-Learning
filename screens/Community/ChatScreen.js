import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import MessageComponent from "../../components/MessageComponent/MessageComponent";
import { FontAwesome } from "@expo/vector-icons";
import { KeyboardAvoidingView } from "react-native";
import { SafeAreaView } from "react-native";
import { auth, db } from "../../firebase";
import { setDoc, doc, Timestamp } from "firebase/firestore";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

const ChatScreen = ({ route, navigation }) => {
  const { Username, Uid } = route.params;
  const [message, setMessage] = useState("");
  const [chat, setchat] = useState([]);
  const [sentby, setsentby] = useState([]);

  useEffect(() => {
    const usersRef = collection(db, "Message");
    console.log(Uid);
    const q = query(usersRef);

    const unsub = onSnapshot(q, (querySnapshot) => {
      let chats = [];
      let sents = [];
      querySnapshot.forEach((doc) => {
        if (
          (doc.data().receiver == Uid &&
            doc.data().sender == auth.currentUser.uid) ||
          (doc.data().receiver == auth.currentUser.uid &&
            doc.data().sender == Uid)
        )
          chats.push(doc.data());
      });
      const sorted = chats.sort((a, b) => a.createdAt - b.createdAt);
      sorted.forEach((msg) => {
        if (msg.receiver == Uid) sents.push("sender");
        else sents.push("receiver");
      });

      console.log(sorted);
      setsentby(sents);

      setchat(chats);
    });
    return () => unsub;
  }, []);

  const handlesend = async () => {
    try {
      const time = new Date().getTime();
      const t = new Date();

      let myuuid = uuidv4();

      await setDoc(doc(db, "Message", myuuid), {
        createdAt: time,
        sender: auth.currentUser.uid,
        receiver: Uid,
        content: message,
        time: t.getHours() + ":" + t.getMinutes(),
      });
    } catch (err) {
      alert(err);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <View style={styles.container}>
          <View style={styles.ChatHeader}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("community");
              }}
            >
              <AntDesign name="back" size={24} color="#50B8E7" />
            </TouchableOpacity>
            <Text style={styles.ChatHeaderUsername}>{Username}</Text>
            <TouchableOpacity>
              <AntDesign name="message1" size={24} color="#50B8E7" />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.ChatBody}>
            {chat.map((message, index) => (
              <MessageComponent
                key={message.createdAt}
                type={sentby[index]}
                time={message.time}
                content={message.content}
              />
            ))}
          </ScrollView>

          <View style={styles.MessageInputContainer}>
            <TextInput
              style={styles.MessageInput}
              placeholder={"Type Message"}
              placeholderTextColor={"#868A96"}
              value={message}
              onChangeText={setMessage}
            />
            <TouchableOpacity onPress={handlesend}>
              <FontAwesome name="send" size={24} color="blue" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#50B8E7",
  },
  ChatHeader: {
    width: "100%",
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  ChatHeaderUsername: {
    fontSize: 20,
    alignSelf: "center",
  },
  ChatBody: {
    flex: 1,
    padding: 20,
  },
  MessageInputContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#fff",
    height: "8%",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  MessageInput: {
    width: "90%",
    height: "100%",
  },
});
