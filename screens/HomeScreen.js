import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome6, Feather } from "@expo/vector-icons";
import { useCallback, useState, useEffect } from "react";
import SupportLanguages from "../utils/SupportLanguages";

import axios from "axios";

export default function HomeScreen(props) {
  const [enteredText, setEnteredText] = useState("");
  const [resultText, setResultText] = useState("");
  const [languageTo, setLanguageTo] = useState("en-GB");
  const [languageFrom, setLanguageFrom] = useState("ru-RU");
  const params = props.route.params || {};
  useEffect(() => {
    if (params.languageTo) {
      setLanguageTo(params.languageTo);
    }

    if (params.languageFrom) {
      setLanguageFrom(params.languageFrom);
    }
  }, [params.languageTo, params.languageFrom]);

  const onSubmit = (translate = () => {
    if (!enteredText) {
      setResultText("");
      return;
    }

    setResultText("Translating...");

    const apiUrl = `https://api.mymemory.translated.net/get?q=
${enteredText}&langpair=${languageFrom}|${languageTo}`;

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        setResultText(data.responseData.translatedText);
        data.matches.forEach((data) => {
          if (data.id === 0) {
            setResultText(data.translation);
          }
        });
      });
  });
  return (
    <View style={styles.container}>
      <View style={styles.languageContainer}>
        <TouchableOpacity
          style={styles.languageOption}
          onPress={() =>
            props.navigation.navigate("languageSelect", {
              title: "Перевести с",
              selected: languageFrom,
              mode: "from",
            })
          }>
          <Text style={styles.languageOptionText}>
            {SupportLanguages[languageFrom]}
          </Text>
        </TouchableOpacity>

        <View style={styles.arrowContainer}>
          <FontAwesome6
            name="arrow-right-arrow-left"
            size={24}
            color="#C2C2C2"
          />
        </View>

        <TouchableOpacity
          style={styles.languageOption}
          onPress={() =>
            props.navigation.navigate("languageSelect", {
              title: "Перевести на",
              selected: languageTo,
              mode: "to",
            })
          }>
          <Text style={styles.languageOptionText}>
            {SupportLanguages[languageTo]}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          multiline
          placeholder="Введите текст"
          style={styles.textInput}
          onChangeText={(text) => setEnteredText(text)}
        />
        <TouchableOpacity
          onPress={onSubmit}
          disabled={enteredText === ""}
          style={styles.iconContainer}>
          <Feather
            name="arrow-right-circle"
            size={28}
            color={enteredText !== "" ? "#2C6BF2" : "#B3C9FA"}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>{resultText}</Text>
        <TouchableOpacity style={styles.iconContainer}>
          <Feather
            disabled={resultText === ""}
            name="copy"
            size={28}
            color={resultText !== "" ? "black" : "grey"}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.historyContainer}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  languageContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingVertical: 18,
    borderBottomColor: "#C2C2C2",
    borderBottomWidth: 1,
  },
  languageOption: {
    flex: 1,
  },
  arrowContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  languageOptionText: {
    color: "#0A369D",
    letterSpacing: 0.3,
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    borderBottomColor: "#C2C2C2",
    borderBottomWidth: 1,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 15,
    letterSpacing: 0.3,
    height: 90,
    fontSize: 18,
  },
  iconContainer: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  resultContainer: {
    flexDirection: "row",
    borderBottomColor: "#C2C2C2",
    borderBottomWidth: 1,
    height: 90,
  },
  resultText: {
    marginTop: 15,
    flex: 1,
    fontSize: 18,
    paddingHorizontal: 20,
    paddingBottom: 15,
    letterSpacing: 0.3,
  },
  historyContainer: {
    backgroundColor: "#F1F3F8",
    flex: 1,
    padding: 10,
  },
});
