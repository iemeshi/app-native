import * as React from "react";
import { Platform, StatusBar, StyleSheet, SafeAreaView } from "react-native";
import { SplashScreen } from "expo";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import BottomTabNavigator from "./navigation/BottomTabNavigator";
import useLinking from "./navigation/useLinking";
import Papa from "papaparse";
import config from "./config.json";

const Stack = createStackNavigator();

const zen2han = (str: string) => {
  return str
    .replace(/[！-～]/g, function (s: string) {
      return String.fromCharCode(s.charCodeAt(0) - 0xfee0);
    })
    .replace(/　/g, " ");
};

export const ShopDataContext = React.createContext<Iemeshi.ShopData[]>([]);

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);

  const [shopList, setShopList] = React.useState<Iemeshi.ShopData[]>([]);

  React.useEffect(() => {
    fetch(config.data_url)
      .then((response) => {
        return response.ok ? response.text() : Promise.reject(response.status);
      })
      .then((responseData) => {
        const { data, errors } = Papa.parse(responseData);
        if (errors.length > 0) {
          console.log(errors);
          setShopList([]);
        } else {
          const [header, ...records] = data;
          const features = records.map((record: string) => {
            const properties = header.reduce((prev: any, column: any) => {
              const value = record[header.indexOf(column)];
              prev[column] = zen2han(value);
              return prev;
            }, {});
            return properties;
          });
          const nextShopList: Iemeshi.ShopData[] = [];
          for (let i = 0; i < features.length; i++) {
            const feature = features[i] as Iemeshi.ShopData;
            if (!feature["緯度"] || !feature["経度"] || !feature["店名"]) {
              continue;
            }
            if (!feature["緯度"].match(/^[0-9]+(\.[0-9]+)?$/)) {
              continue;
            }
            if (!feature["経度"].match(/^[0-9]+(\.[0-9]+)?$/)) {
              continue;
            }
            const shop = {
              index: i,
              ...feature,
            };
            nextShopList.push(shop);
          }
          setShopList(nextShopList);
        }
      });
  }, []);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf"),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        {Platform.OS === "ios" && <StatusBar barStyle="default" />}
        <ShopDataContext.Provider value={shopList}>
          <NavigationContainer
            ref={containerRef}
            initialState={initialNavigationState}
          >
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Root" component={BottomTabNavigator} />
            </Stack.Navigator>
          </NavigationContainer>
        </ShopDataContext.Provider>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
