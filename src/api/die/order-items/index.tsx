import { supabase } from "@/src/lib/supabase";
import { useMutation } from "@tanstack/react-query";

export const useInsertOrderItems = () => {
  return useMutation({
    async mutationFn(
      items: {
        order_id: number;
        product_id: number;
        quantity: number;
        size: string;
      }[]
    ) {
      const { error, data: newOrderItems } = await supabase
        .from("order_items")
        .insert(items)
        .select();

      if (error) {
        throw new Error(error.message);
      }
      return newOrderItems;
    },
  });
};
