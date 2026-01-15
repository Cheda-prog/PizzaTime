import { supabase } from "@/src/lib/supabase";
import { useAuth } from "@/src/providers/AuthProviders";
import { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function EmailVerification() {
  const { session } = useAuth();
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const isEmailVerified = session?.user?.email_confirmed_at;

  const sendVerificationEmail = async () => {
    if (countdown > 0) {
      Alert.alert("Please wait", `You can resend in ${countdown} seconds`);
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email: session?.user?.email || "",
      });

      if (error) throw error;

      Alert.alert(
        "Verification Email Sent",
        "Please check your email and click the verification link."
      );

      // Start countdown
      setCountdown(60);
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const checkVerificationStatus = async () => {
    const {
      data: { session: newSession },
    } = await supabase.auth.getSession();
    if (newSession?.user?.email_confirmed_at) {
      Alert.alert("Success", "Your email has been verified!");
    } else {
      Alert.alert(
        "Not Verified",
        "Please check your email and click the verification link."
      );
    }
  };

  if (isEmailVerified) {
    return null; // Don't show banner if email is verified
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.icon}>📧</Text>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Verify Your Email</Text>
          <Text style={styles.description}>
            Please verify your email address to access all features
          </Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.checkButton]}
          onPress={checkVerificationStatus}
        >
          <Text style={styles.checkButtonText}>Refresh</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            styles.resendButton,
            loading && styles.buttonDisabled,
          ]}
          onPress={sendVerificationEmail}
          disabled={loading || countdown > 0}
        >
          <Text style={styles.resendButtonText}>
            {countdown > 0
              ? `Resend (${countdown}s)`
              : loading
              ? "Sending..."
              : "Resend Email"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF3CD",
    borderBottomWidth: 1,
    borderBottomColor: "#FFE69C",
    padding: 16,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  icon: {
    fontSize: 24,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#664D03",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#664D03",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 8,
  },
  button: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: "center",
  },
  checkButton: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#FFC107",
  },
  checkButtonText: {
    color: "#664D03",
    fontWeight: "600",
  },
  resendButton: {
    backgroundColor: "#FFC107",
  },
  resendButtonText: {
    color: "#664D03",
    fontWeight: "600",
  },
  buttonDisabled: {
    opacity: 0.6,
  },
});
