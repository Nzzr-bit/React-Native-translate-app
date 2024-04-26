import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
export default LoginScreen = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleLogin = async () => {
    if (username === "123" && password === "123") {
      try {
        const token = "example_token";
        await AsyncStorage.setItem("token", token);
        props.navigation.navigate("main");
      } catch (error) {
        console.error("Ошибка при сохранении токена:", error);
      }
    } else {
      setError("Неверное имя пользователя или пароль");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Please</Text>
      <TextInput
        style={styles.input}
        placeholder="Логин"
        onChangeText={(text) => setUsername(text)}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Пароль"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title="Войти" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});
