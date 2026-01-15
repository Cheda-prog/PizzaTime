import { supabase } from "@/src/lib/supabase";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Text } from "react-native";

export default function Callback() {
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        router.replace("/");
      }
    });
  }, []);

  return <Text>Confirming email…</Text>;
}
