import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";
import { Text } from "react-native";
import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import ListScreen from "../screens/ListScreen";
import AllScreen from "../screens/AllScreen";
import AboutUsScreen from "../screens/AboutUsScreen";
import GotoForm from "../screens/GotoForm";
import { State } from "react-native-gesture-handler";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Home";

export default function BottomTabNavigator({ navigation, route }) {
  const routeName =
    route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(routeName) });

  return (
    <>
      <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
        <BottomTab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "ホーム",
            tabBarIcon: ({ focused }) => (
              <TabBarIcon focused={focused} name="md-home" />
            ),
          }}
        />
        <BottomTab.Screen
          name="List"
          component={ListScreen}
          options={{
            title: "一覧",
            tabBarIcon: ({ focused }) => (
              <TabBarIcon focused={focused} name="md-list" />
            ),
          }}
        />
        <BottomTab.Screen
          name="All"
          component={AllScreen}
          options={{
            title: "全国",
            tabBarIcon: ({ focused }) => (
              <TabBarIcon focused={focused} name="md-globe" />
            ),
          }}
        />
        <BottomTab.Screen
          name="AboutUs"
          component={AboutUsScreen}
          options={{
            title: "イエメシについて",
            tabBarIcon: ({ focused }) => (
              <TabBarIcon focused={focused} name="md-apps" />
            ),
          }}
        />
      </BottomTab.Navigator>
      {routeName === "AboutUs" && <GotoForm></GotoForm>}
    </>
  );
}

function getHeaderTitle(routeName: string) {
  switch (routeName) {
    case "Home":
      return "ホーム";
    case "List":
      return "一覧";
    case "All":
      return "全国";
    case "AboutUs":
      return "イエメシについて";
  }
}
