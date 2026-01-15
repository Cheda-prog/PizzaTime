import Button from "@/src/components/ButtonComponent";
import { supabase } from "@/src/lib/supabase";
import { StyleSheet, View } from "react-native";
const ProfileScreen = () => {
  return (
    <View>
      <Button
        text="Sign out"
        onPress={async () => await supabase.auth.signOut()}
      />
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
    color: "lightblue",
    marginVertical: 10,
  },
});

export default ProfileScreen;
