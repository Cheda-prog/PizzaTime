import { ScrollView, View } from "react-native";
import products from "../../../assets/data/products";
import ProductlistItem from "../../components/ProductListItem";

export default function MenuScreen() {
  return (
    <ScrollView>
      <View>
        <ProductlistItem product={products[0]} />
        <ProductlistItem product={products[1]} />
      </View>
    </ScrollView>
  );
}
