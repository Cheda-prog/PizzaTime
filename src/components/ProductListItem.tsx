import Color from "@/src/constants/Colors";
import { Link, useSegments } from "expo-router";
import { Image, Pressable, StyleSheet, Text } from "react-native";
import { Tables } from "../database.types";

export const DefaultImage =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";

type ProductlistItemProp = {
  product: Tables<"products">;
};

const ProductlistItem = ({ product }: ProductlistItemProp) => {
  const segments = useSegments();

  //console.log(product);
  return (
    <Link href={`./menu/${product.id}`} asChild>
      <Pressable style={styles.container}>
        <Image
          source={{ uri: product.image || DefaultImage }}
          style={styles.Image}
          resizeMode="contain"
        />
        <Text style={styles.title}> {product.name}</Text>
        <Text style={styles.price}>{product.price}</Text>
      </Pressable>
    </Link>
  );
};

export default ProductlistItem;

const styles = StyleSheet.create({
  Image: {
    width: "100%",
    aspectRatio: 1,
  },
  container: {
    flex: 1,
    padding: 10,
    maxWidth: "50%",
    backgroundColor: "gray",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  price: {
    fontSize: 18,
    color: Color.light.tint,
  },
});
