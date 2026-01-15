import { randomUUID } from "expo-crypto";
import { useRouter } from "expo-router";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { useInsertOrderItems } from "../api/die/order-items";
import { useInsertOrder } from "../api/die/orders";
import { CartItem, Tables } from "../components/types";

type Product = Tables<"products">;

type CartType = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem["size"]) => void;
  updateQuantity: (itemID: string, amount: -1 | 1) => void;
  total: number;
  checkout: () => void;
};

const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  total: 0,
  checkout: () => {},
});

const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([]);
  console.log("PROVIDER ITEMS", items);

  /// mutations here
  const { mutate: insertOrder } = useInsertOrder();
  const { mutate: insertOrderItems } = useInsertOrderItems();

  const router = useRouter();

  const addItem = (product: Product, size: CartItem["size"]) => {
    // if already in cart, incriment quantity
    const existingItem = items.find(
      (item) => item.product === product && item.size === size
    );
    if (existingItem) {
      updateQuantity(existingItem.id, 1);
      return;
    }
    const newCartItem: CartItem = {
      id: randomUUID(), // generated
      product,
      product_id: product.id,
      size,
      quantity: 1,
    };
    setItems([newCartItem, ...items]);
  };

  // update quantity
  const updateQuantity = (itemID: string, amount: -1 | 1) => {
    setItems(
      items
        .map((item) =>
          item.id !== itemID
            ? item
            : { ...item, quantity: item.quantity + amount }
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const amt = items.reduce(
    (sum, item) => (sum += item.product.price * item.quantity),
    0
  );
  const total = Math.floor(amt * 100) / 100;

  const checkout = () => {
    console.log("hi");

    insertOrder(
      {
        total,
        status: "New",
        // Add any other required fields from your orders table
        // For example: user_id is already handled in useInsertOrder
      },
      {
        onSuccess: saveOrderItems,
      }
    );
  };

  const saveOrderItems = (order: Tables<"orders">) => {
    const orderItems = items.map((cartItem) => ({
      order_id: order.id,
      product_id: cartItem.product_id,
      quantity: cartItem.quantity,
      size: cartItem.size,
    }));

    insertOrderItems(orderItems, {
      onSuccess() {
        setItems([]);
        router.push(`/(user)/orders/${order.id}`);
      },
    });
  };
  // console.log(items);
  return (
    <CartContext.Provider
      value={{ items, addItem, updateQuantity, total, checkout }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => useContext(CartContext);
