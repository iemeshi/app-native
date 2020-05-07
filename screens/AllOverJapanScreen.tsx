import * as React from "react";
import { StyleSheet } from "react-native";
import { WebView, WebViewNavigation } from "react-native-webview";
import { Linking } from "expo";
import url from "url";

export default function AllOverJapanScreen() {
  const ref = React.useRef(null);

  const onNavigationStateChange = (newNavState: WebViewNavigation) => {
    const { url: navUrl } = newNavState;
    const { host, path } = url.parse(navUrl);
    if (host !== "iemeshi.jp" || path !== "/") {
      Linking.openURL(navUrl);
      // @ts-ignore
      ref.current.stopLoading();
      return false;
    } else {
      return true;
    }
  };

  return (
    <WebView
      ref={ref}
      source={{ uri: "https://iemeshi.jp" }}
      style={styles.container}
      onNavigationStateChange={onNavigationStateChange}
      onShouldStartLoadWithRequest={onNavigationStateChange}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
