import {
  useDeleteProduct,
  useInsertProduct,
  useProduct,
  useUpdateProduct,
} from "@/src/api/die/products";
import Button from "@/src/components/ButtonComponent";
import { DefaultImage } from "@/src/components/ProductListItem";
import { supabase } from "@/src/lib/supabase";
import { decode } from "base64-arraybuffer";
import { randomUUID } from "expo-crypto";
import { File } from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Image, StyleSheet, Text, TextInput, View } from "react-native";

const CreateProductScreen = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [error, setErrors] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(
    typeof idString === "string" ? idString : idString?.[0]
  );

  const isUpdating = !!id;
  const router = useRouter();

  const { mutate: insertProduct } = useInsertProduct();
  const { mutate: updateProduct } = useUpdateProduct();
  const { data: updatingProduct } = useProduct(id);
  const { mutate: deleteingProduct } = useDeleteProduct();

  useEffect(() => {
    if (updatingProduct) {
      setName(updatingProduct.name);
      setPrice(updatingProduct.price.toString());
      setImage(updatingProduct.image);
    }
  }, [updatingProduct]);

  const resetFields = () => {
    setName("");
    setPrice("");
  };

  const validateInput = () => {
    setErrors("");
    if (!name) {
      setErrors("Name is required");
      return false;
    }
    if (!price) {
      setErrors("Price is required");
      return false;
    }
    if (isNaN(parseFloat(price))) {
      setErrors("Price is required");
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library.
    // Manually request permissions for videos on iOS when `allowsEditing` is set to `false`
    // and `videoExportPreset` is `'Passthrough'` (the default), ideally before launching the picker
    // so the app users aren't surprised by a system dialog after picking a video.
    // See "Invoke permissions for videos" sub section for more details.
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required",
        "Permission to access the media library is required."
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    //console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onSubmit = () => {
    if (isUpdating) {
      onUpdate();
    } else {
      onCreate();
    }
  };
  const onCreate = async () => {
    if (!validateInput()) {
      return;
    }

    const imagePath = await uploadImage();
    console.warn("Creating product: ", name);
    insertProduct(
      { name, price: parseFloat(price), image: imagePath },
      {
        onSuccess: () => {
          resetFields();
          router.back();
        },
      }
    );
  };

  const onUpdate = async () => {
    if (!validateInput()) {
      return;
    }
    console.warn("Updating product", name);
    const imagePath = await uploadImage();
    // save in DataBase
    updateProduct(
      { id, name, price: parseFloat(price), image: imagePath },
      {
        onSuccess: () => {
          resetFields();
          router.back();
        },
      }
    );
  };

  const onDelete = () => {
    console.warn("DELETE!!!!!!!!");
    deleteingProduct(id, {
      onSuccess: () => {
        resetFields();
        router.replace("/(admin)");
      },
    });
  };

  const confirmDelete = () => {
    Alert.alert("Confirm", "Are you sure tyou want to delete this product", [
      {
        text: "Cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: onDelete,
      },
    ]);
  };

  const uploadImage = async () => {
    if (!image?.startsWith("file://")) {
      return;
    }

    const filePath = `${randomUUID()}.png`;

    // Use the new File API
    const file = new File(image);
    const base64 = await file.base64();

    const { data, error } = await supabase.storage
      .from("Product-images")
      .upload(filePath, decode(base64), {
        contentType: "image/png",
      });

    if (error) {
      console.error("Upload error:", error);
      throw new Error(error.message);
    }

    return data?.path;
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ title: isUpdating ? "Update Product" : "Create Product" }}
      />
      <Image
        source={{ uri: image || DefaultImage }}
        style={styles.image}
      ></Image>
      <Text style={styles.textButton} onPress={pickImage}>
        Select Image
      </Text>
      <Text style={styles.label}> Name </Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Margarita"
        style={styles.input}
        keyboardType="default"
      />

      <Text style={styles.label}> Price </Text>
      <TextInput
        value={price}
        onChangeText={setPrice}
        placeholder="9.99"
        style={styles.input}
        keyboardType="numeric"
      />
      <Button onPress={onSubmit} text={isUpdating ? "Update" : "Create"} />
      {isUpdating && <Button onPress={confirmDelete} text="Delete" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 20,
  },
  label: {
    color: "gray",
    fontSize: 16,
  },
  image: {
    aspectRatio: 1,
    height: "50%",
    alignSelf: "center",
  },
  textButton: {
    alignSelf: "center",
    fontWeight: "bold",
    marginVertical: 10,
    color: "blue",
  },
});

export default CreateProductScreen;
