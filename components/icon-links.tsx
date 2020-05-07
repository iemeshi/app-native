import * as React from "react";
import { View, StyleSheet, Linking } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";

type Props = {
  data: Iemeshi.ShopData;
};

export default function IconLinks(props: Props) {
  return (
    <View style={styles.container}>
      {props.data["電話番号"] ? (
        <Ionicons
          name="md-call"
          size={24}
          color="black"
          onPress={() => {
            Linking.openURL(`tel:${props.data["電話番号"]}`);
          }}
        />
      ) : null}
      {props.data["Instagram"] ? (
        <AntDesign
          name="instagram"
          size={24}
          color="black"
          onPress={() => {
            Linking.openURL(`https://instagram.com/${props.data["Instagram"]}`);
          }}
        />
      ) : null}
      {props.data["Twitter"] ? (
        <AntDesign
          name="twitter"
          size={24}
          color="black"
          onPress={() => {
            Linking.openURL(`https://twitter.com/${props.data["Twitter"]}`);
          }}
        />
      ) : null}
      {props.data["公式サイト"] ? (
        <Ionicons
          name="md-home"
          size={24}
          color="black"
          onPress={() => {
            Linking.openURL(props.data["公式サイト"]);
          }}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    marginRight: 0,
    marginBottom: 24,
    marginLeft: 0,
    display: "flex",
    flexDirection: "row",
  },
});
