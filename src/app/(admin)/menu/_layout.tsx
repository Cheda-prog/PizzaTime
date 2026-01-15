import Colors from "@/src/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { Link, Stack, useRouter } from "expo-router";
import { Pressable } from "react-native";

export default function MenuStack() {
  const router = useRouter(); // get router instance

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Menu",
          headerLeft: () => (
            <Pressable
              onPress={() => router.back()} // go back one page
              style={({ pressed }) => ({
                marginLeft: 15,
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome
                name="arrow-left"
                size={25}
                color={Colors.light.tint}
              />
            </Pressable>
          ),
          headerRight: () => (
            <Link href="/(admin)/menu/create" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="user-o"
                    size={25}
                    color={Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
    </Stack>
  );
}
