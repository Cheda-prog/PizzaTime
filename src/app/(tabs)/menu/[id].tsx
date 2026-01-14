import Button from "@/src/components/ButtonComponent";
import { PizzaSize } from "@/src/components/types";
import { useCart } from "@/src/providers/CartProviders";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import products from "../../../../assets/data/products";

export const DefaultImage =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";

const sizes: PizzaSize[] = ["S", "M", "L", "XL"];

const ProductDeatailsScreen = () => {
  const { id } = useLocalSearchParams();

  const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");
  const { addItem } = useCart();
  const router = useRouter();

  const product = products.find((p) => p.id.toString() == id);

  const addToCart = () => {
    console.log("ADD TO CART PRESSED");
    if (!product) {
      return;
    }
    addItem(product, selectedSize);
    router.push("/cart");
  };

  if (!product) {
    return <Text>Product not found</Text>;
  }
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.name }} />
      <Image
        style={styles.image}
        source={{ uri: product.image || DefaultImage }}
      />

      <Text>Select Size</Text>

      <View style={styles.sizes}>
        {sizes.map((size) => (
          <Pressable
            key={size}
            onPress={() => {
              setSelectedSize(size);
            }}
            style={[
              styles.size,
              { backgroundColor: selectedSize == size ? "gainsboro" : "white" },
            ]}
          >
            <Text
              style={[
                styles.sizetext,
                { color: selectedSize == size ? "black" : "gainsboro" },
              ]}
            >
              {size}
            </Text>
          </Pressable>
        ))}
      </View>
      <Text style={styles.price}> $ {product.price}</Text>
      <Button onPress={addToCart} text="Purchase Item" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: "auto",
  },
  sizetext: {
    fontSize: 20,
    fontWeight: "500",
    color: "black",
  },
  sizes: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  size: {
    backgroundColor: "red",
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ProductDeatailsScreen;
