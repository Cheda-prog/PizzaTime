import EmailVerification from "@/src/components/EmailVerification";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function VerifyEmailScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>One More Step!</Text>
      <Text style={styles.subtitle}>
        We've sent a verification link to your email address.
      </Text>

      <EmailVerification />

      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => router.replace("/(user)")}
      >
        <Text style={styles.continueButtonText}>Continue to App</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
    textAlign: "center",
  },
  continueButton: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 8,
    marginTop: 20,
  },
  continueButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
});
