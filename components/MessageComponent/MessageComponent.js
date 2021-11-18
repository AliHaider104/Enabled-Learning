import React from "react";
import { StyleSheet, Text, View } from "react-native";

const MessageComponent = ({ content, type = "sender", time }) => {
  return (
    <View style={styles.Message}>
      <View style={[styles.MessageBody, styles[`MessageBody_${type}`]]}>
        <View style={[styles.ContentBody, styles[`ContentBody_${type}`]]}>
          <Text style={styles.Content}>{content}</Text>
        </View>
        <Text style={[styles.Time, styles[`Time_${type}`]]}>{time}</Text>
      </View>
    </View>
  );
};

export default MessageComponent;

const styles = StyleSheet.create({
  Message: {
    width: "100%",
    justifyContent: "center",
    marginBottom: 20,
  },
  MessageBody: {
    width: "70%",
  },
  MessageBody_sender: {
    alignSelf: "flex-end",
  },
  MessageBody_receiver: {
    alignSelf: "flex-start",
  },
  ContentBody_sender: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderColor: "#fff",
  },
  ContentBody_receiver: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderColor: "#1B52A5",
  },
  ContentBody: {
    borderWidth: 2,
    width: "100%",
    padding: 10,
    marginBottom: 10,
  },

  Content: {
    fontSize: 15,
    color: "#fff",
  },
  Time: {
    color: "#fff",
    fontSize: 20,
  },
  Time_sender: {
    color: "#fff",
    fontSize: 20,
    textAlign: "right",
  },
});
