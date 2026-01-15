import {
  initPaymentSheet,
  presentPaymentSheet,
} from "@stripe/stripe-react-native";
import { Alert } from "react-native";
import { supabase } from "./supabase";

const fetchPaymentSheetParams = async (amount: number) => {
  try {
    console.log('=== PAYMENT SHEET DEBUG ===');
    console.log('Amount:', amount);
    
    const { data, error } = await supabase.functions.invoke("payment-sheet", {
      body: { amount },
    });
    
    if (error) {
      console.error("Supabase function error:", error);
      Alert.alert("Error fetching payment sheet params", error.message);
      return null;
    }
    
    if (data) {
      console.log("Payment sheet params received successfully");
      return data;
    }
    
    Alert.alert("Error", "No data returned from payment sheet");
    return null;
  } catch (err) {
    console.error("Exception in fetchPaymentSheetParams:", err);
    Alert.alert("Error", "Failed to fetch payment sheet params");
    return null;
  }
};

export const initialisePaymentSheet = async (amount: number) => {
  console.log("Initialising payment sheet, for: ", amount);

  const params = await fetchPaymentSheetParams(amount);
  
  if (!params) {
    console.error("No params returned");
    return;
  }

  const { paymentIntent, publishableKey, customer, ephemeralKey } = params;

  if (!paymentIntent || !publishableKey) {
    console.error("Missing required params");
    Alert.alert("Error", "Missing payment intent or publishable key");
    return;
  }

  try {
    console.log("Calling initPaymentSheet...");
    const result = await initPaymentSheet({
      merchantDisplayName: "PizzaTime",
      paymentIntentClientSecret: paymentIntent,
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      allowsDelayedPaymentMethods: true,
      returnURL: "pizzatime://stripe-redirect",
      // This enables the "Save for future use" checkbox
      defaultBillingDetails: {
        name: "Customer",
      },
    });
    
    console.log("initPaymentSheet result:", result);
    
    if (result.error) {
      console.error("Error initializing payment sheet:", result.error);
      Alert.alert("Error", result.error.message);
    } else {
      console.log("Payment sheet initialized successfully!");
    }
  } catch (err) {
    console.error("Exception in initPaymentSheet:", err);
    Alert.alert("Error", String(err));
  }
};

export const openPaymentSheet = async () => {
  const { error } = await presentPaymentSheet();

  if (error) {
    Alert.alert(error.message);
    return false;
  }
  return true;
};