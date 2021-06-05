import * as React from "react";
import { View, StyleSheet, Button } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default class PickImage extends React.Component {
  state = {
    image: null,
  };
  uploadImage = async (uri) => {
    const data = new FormData();
    let fileName = uri.split("/")[uri.split("/").length - 1];
    let type = `image/${uri.split(".")[uri.split(".").length - 1]}`;
    const fileToUpload = {
      uri: uri,
      name: fileName,
      type: type,
    };
    data.append("letter", fileToUpload);
    fetch("http://9dcd2be286db.ngrok.io/predict", {
      method: "POST",
      body: data,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  };
  pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        this.setState({
          image: result.data,
        });
        this.uploadImage(result.uri);
      }
    } catch (e) {
      console.log(e);
    }
  };
  render() {
    let image = this.state;
    return (
      <View style={styles.container}>
        <Button title="Pick Image" onPress={this.pickImage} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
