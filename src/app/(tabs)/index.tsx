import Color from "@/src/constants/Colors";
import { Image, StyleSheet, View } from "react-native";
import products from "../../../assets/data/products";

const Product = products[2];

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Image source={{ uri: Product.image }} style={styles.Image} />
      <text style={styles.title}> {Product.name}</text>
      <text style={styles.Price}>12.99</text>
    </View>
  );
}

const styles = StyleSheet.create({
  Image: {
    width: "50%",
    aspectRatio: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  Price: {
    fontSize: 10,
    color: Color.light.tint,
  },
});
