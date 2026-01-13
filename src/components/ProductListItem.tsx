import Color from "@/src/constants/Colors";
import { Image, StyleSheet, Text, View } from "react-native";

const ProductlistItem = ({ product }) => {
  console.log(product);
  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.Image} />
      <Text style={styles.title}> {product.name}</Text>
      <Text style={styles.price}>{product.price}</Text>
    </View>
  );
};

export default ProductlistItem;

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
  price: {
    fontSize: 10,
    color: Color.light.tint,
  },
});
