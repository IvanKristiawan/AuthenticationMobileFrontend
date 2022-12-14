import axios from "axios";
import { useContext, useEffect, useState } from "react";

import { StyleSheet, Text, View } from "react-native";
import { AuthContext } from "../store/auth-context";

function WelcomeScreen() {
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const id = authCtx.id;

  useEffect(() => {
    axios
      .post("https://authentication-web-mobile.herokuapp.com/users/" + id, {
        id: id,
        token: token,
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token, id]);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{id}</Text>
      <Text>{token}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
