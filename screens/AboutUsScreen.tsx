import * as React from "react";
import { StyleSheet, Text, Image, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Linking } from "expo";
import config from "../config.json";

function Paragraph(props: any) {
  return (
    <Text style={{ ...styles.paragraph, ...props.style }} {...props}>
      {props.children}
    </Text>
  );
}

function LinkText(props: any) {
  return (
    <Text style={{ ...styles.link, ...props.style }} {...props}>
      {props.children}
    </Text>
  );
}

export default function AboutUsScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollViewContentContainer}
    >
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../assets/images/logo.png")}
        />
        <Image
          style={styles.typography}
          source={require("../assets/images/typography.png")}
          resizeMode={"contain"}
        />
      </View>

      <View>
        <Paragraph>
          イエメシはテイクアウトに対応しているお店を紹介するためのアプリで、
          <LinkText
            onPress={() => Linking.openURL("https://github.com/iemeshi/app")}
          >
            オープンソース
          </LinkText>
          で開発されています。
        </Paragraph>
        <Paragraph>
          掲載されている店舗は、コミュニティのみなさんによってメンテナンスされています。
        </Paragraph>

        <Text style={styles.h2}>{`${config.title}版について`}</Text>
        <Paragraph>
          {config.title}版は以下のリポジトリで開発されています。
        </Paragraph>
        <Paragraph>
          <LinkText onPress={() => Linking.openURL(config.repository)}>
            {config.repository}
          </LinkText>
        </Paragraph>

        {config.form_url && (
          <>
            <Paragraph>
              データの追加や修正をご希望の方は以下のフォームをご利用ください。
            </Paragraph>
            <Paragraph>
              <LinkText onPress={() => Linking.openURL(config.form_url)}>
                データの登録/更新申請フォーム
              </LinkText>
            </Paragraph>
          </>
        )}

        <Text style={styles.h2}>イエメシに関するお問い合わせ</Text>
        <Paragraph>
          <LinkText
            onPress={() => Linking.openURL("https://geolonia.com/contact/")}
          >
            イエメシに関するお問い合わせはこちらからどうぞ。
          </LinkText>
        </Paragraph>
        <Paragraph>
          掲載店舗に関するお問い合わせにつきましては、ご対応いたしかねますのであらかじめご了承ください。
        </Paragraph>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollViewContentContainer: {
    padding: 24,
  },
  imageContainer: {
    marginBottom: 40,
    textAlign: "center",
    alignItems: "center",
  },
  image: {
    width: 96,
    height: 96,
  },
  typography: {
    width: 180,
    height: 70,
  },
  h1: {
    textAlign: "center",
    fontSize: 72,
  },
  h2: {
    textAlign: "left",
    fontSize: 22,
    marginBottom: 22,
    fontWeight: "bold",
  },
  paragraph: {
    fontSize: 18,
    marginBottom: 18,
  },
  link: {
    color: "#007bff",
  },
});
