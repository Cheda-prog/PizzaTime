import { useInsertOrderSubscription } from "@/src/api/die/order-items/subscriptions";
import { useMyOrderList } from "@/src/api/die/orders";
import OrderListItem from "@/src/components/OrderListItem";
import { ActivityIndicator, FlatList, Text } from "react-native";

export default function OrdersScreen() {
  const { data: orders, isLoading, error } = useMyOrderList();

  useInsertOrderSubscription();

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Failed to fetch</Text>;
  }

  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => <OrderListItem order={item} />}
      contentContainerStyle={{ gap: 10, padding: 10 }}
    />
  );
}
