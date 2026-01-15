import { StatusBar } from "expo-status-bar";
import { FlatList, Platform, Text, View } from "react-native";
import Button from "../components/ButtonComponent";
import CartListItem from "../components/CartListItem";
import { useCart } from "../providers/CartProviders";

const cartScreen = () => {
  const { items, total, checkout } = useCart();

  return (
    <View>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={{ padding: 10, gap: 10 }}
      />
      <Text style={{ marginTop: 20, fontSize: 20, fontWeight: "500" }}>
        Total: ${total}
      </Text>

      <Button onPress={checkout} text="Checkout"></Button>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
};

export default cartScreen;
