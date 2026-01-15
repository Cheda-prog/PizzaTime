import { useProductList } from "@/src/api/die/products";
import { ActivityIndicator, FlatList, Text } from "react-native";
import ProductlistItem from "../../../components/ProductListItem";

export default function MenuScreen() {
  const { data: products, error, isLoading } = useProductList();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text> Failed to fetch products </Text>;
  }
  return (
    <FlatList
      data={products}
      renderItem={({ item }) => <ProductlistItem product={item} />}
      numColumns={2}
      contentContainerStyle={{ gap: 10 }}
      columnWrapperStyle={{ gap: 10 }}
    />
  );
}
