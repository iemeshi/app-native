import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import config from "../config.json";

export default () => {
  return (
    config.form_url && (
      <View style={styles.gotoFormContainer}>
        <View style={styles.gotoForm}>
          <Ionicons
            style={styles.icon}
            name={"md-add"}
            size={30}
            color={"white"}
          />
        </View>
      </View>
    )
  );
};
const styles = StyleSheet.create({
  gotoFormContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 99999,
    position: "absolute",
    bottom: 65,
  },
  gotoForm: {
    width: 36,
    height: 36,
    backgroundColor: "#007bff",
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    bottom: -1,
  },
});
