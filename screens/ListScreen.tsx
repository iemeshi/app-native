import * as React from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import { ShopDataContext } from "../App";
import * as Location from "expo-location";
import * as turf from "@turf/turf";
import IconLinks from "../components/icon-links";

const makeDistanceLabelText = (distance: number | void) => {
  let distanceTipText = "";
  if (typeof distance === "number" && !Number.isNaN(distance)) {
    if (distance > 1000) {
      distanceTipText = Math.round(distance / 1000) + " km";
    } else {
      distanceTipText = Math.round(distance) + " m";
    }
  }
  return distanceTipText;
};

const askGeolocationPermission = async () => {
  let { status } = await Location.requestPermissionsAsync();
  if (status !== "granted") {
    return null;
  }

  const location = await Location.getCurrentPositionAsync({});

  const lat = location.coords.latitude;
  const lng = location.coords.longitude;
  return [lng, lat];
};

const sortShopList = async (shopList: Iemeshi.ShopData[]) => {
  const currentPosition = await askGeolocationPermission();
  if (currentPosition) {
    const from = turf.point(currentPosition);
    const sortingShopList = shopList.map((shop) => {
      const lng = parseFloat(shop["経度"]);
      const lat = parseFloat(shop["緯度"]);
      if (Number.isNaN(lng) || Number.isNaN(lat)) {
        return shop;
      } else {
        const to = turf.point([lng, lat]);
        const distance = turf.distance(from, to, {
          units: "meters" as "meters",
        });
        return { ...shop, distance };
      }
    });
    sortingShopList.sort((a, b) => {
      if (typeof a.distance !== "number" || Number.isNaN(a.distance)) {
        return 1;
      } else if (typeof b.distance !== "number" || Number.isNaN(b.distance)) {
        return -1;
      } else {
        return a.distance - b.distance;
      }
    });
    return sortingShopList;
  } else {
    return shopList;
  }
};

const ListScreenContent = (props: { shops: Iemeshi.ShopData[] }) => {
  const { shops } = props;
  const [data, setData] = React.useState(shops);
  React.useEffect(() => {
    let isMounted = true;
    sortShopList(shops).then((sortedData) => {
      // prevent memory leak
      if (isMounted) {
        setData(sortedData);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [data]);

  return (
    <ScrollView style={styles.container}>
      {data.map((shop) => {
        const distanceTipText = makeDistanceLabelText(shop.distance);
        return (
          <View key={shop.index}>
            <Text style={styles.title}>{shop.店名}</Text>
            <View style={styles.categoryContainer}>
              <Text>
                <Text style={styles.categoryText}>{shop.ジャンル}</Text>
              </Text>
            </View>
            {distanceTipText ? (
              <View style={styles.distanceContainer}>
                <Text>
                  <Text style={styles.distanceTipText}>{distanceTipText}</Text>
                </Text>
              </View>
            ) : null}
            <IconLinks data={shop}></IconLinks>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default function ListScreen() {
  return (
    <ShopDataContext.Consumer>
      {(shops) => <ListScreenContent shops={shops} />}
    </ShopDataContext.Consumer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  categoryContainer: {
    backgroundColor: "#f5b041",
    color: "white",
    padding: 4,
    borderRadius: 4,
  },
  categoryText: {
    fontSize: 14,
    color: "white",
  },
  distanceContainer: {
    backgroundColor: "#41b0f5",
    color: "white",
    padding: 4,
    borderRadius: 4,
  },
  distanceTipText: {
    fontSize: 14,
    color: "white",
  },
});
