import { Link, Redirect } from "expo-router";
import React from "react";
import { ActivityIndicator, View } from "react-native";
import Button from "../components/ButtonComponent";
import { supabase } from "../lib/supabase";
import { useAuth } from "../providers/AuthProviders";
const index = () => {
  const { session, loading, isAdmin } = useAuth();

  if (loading) {
    return <ActivityIndicator />;
  }

  if (!session) {
    return <Redirect href={"/sign-in"} />;
  }

  /*if (!isAdmin) {
    return <Redirect href={"/(user)"} />;
  } */
  console.log("are we here?");
  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
      <Link href={"/(user)"} asChild>
        <Button text="User" />
      </Link>
      <Link href={"/(admin)"} asChild>
        <Button text="Admin" />
      </Link>

      <Button onPress={() => supabase.auth.signOut()} text="sign-out" />
    </View>
  );
};

export default index;
