import Button from "@/src/components/ButtonComponent";
import { supabase } from "@/src/lib/supabase";
import { Link, Stack } from "expo-router";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import Colors from "../../constants/Colors";

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setloading] = useState(false);

  async function signUpWithEmail() {
    setloading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: "myapp://auth/callback",
      },
    });

    if (error) Alert.alert(error.message);
    else Alert.alert("Check your email to confirm your account");

    setloading(false);
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Sign up" }} />

      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="jon@gmail.com"
        style={styles.input}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder=""
        style={styles.input}
        secureTextEntry
      />

      <Button
        onPress={signUpWithEmail}
        disabled={loading}
        text={loading ? "Creating acount.." : "Create account"}
      />
      <Link href="/sign-in" style={styles.textButton}>
        Sign in
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "center",
    flex: 1,
  },
  label: {
    color: "gray",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 5,
  },
  textButton: {
    alignSelf: "center",
    fontWeight: "bold",
    color: Colors.light.tint,
    marginVertical: 10,
  },
});

export default SignUpScreen;
