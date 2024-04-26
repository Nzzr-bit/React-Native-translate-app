import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { FontAwesome6, Feather } from "@expo/vector-icons";
import * as Speech from "expo-speech";
import * as Clipboard from "expo-clipboard";
import { useDispatch } from "react-redux";
import { addSearchToHistory } from "../store/historySlice";
import SupportLanguages from "../utils/SupportLanguages";
import colors from "../utils/colors";

export default function HomeScreen(props) {
  const [enteredText, setEnteredText] = useState("");
  const [resultText, setResultText] = useState("");
  const [languageTo, setLanguageTo] = useState("en-GB");
  const [languageFrom, setLanguageFrom] = useState("ru-RU");

  const dispatch = useDispatch();

  const speakText = () => {
    const options = {
      voice: `${languageTo}-SMTf00`,
      pitch: 1,
      rate: 0.7,
    };
    Speech.speak(resultText, options);
  };

  const params = props.route.params || {};
  useEffect(() => {
    if (params.languageTo) {
      setLanguageTo(params.languageTo);
    }

    if (params.languageFrom) {
      setLanguageFrom(params.languageFrom);
    }
  }, [params.languageTo, params.languageFrom]);

  const onSubmit = () => {
    if (!enteredText) {
      setResultText(" ");
      return;
    }

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
        dispatch(
          addSearchToHistory({
            originalText: enteredText,
            translatedText: data.responseData.translatedText,
          })
        );
      });
  };

  const copyToClipboard = useCallback(async () => {
    await Clipboard.setStringAsync(resultText);
  }, [resultText]);

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
            color={colors.white}
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
        <View>
          <TextInput
            multiline
            placeholder="Введите текст"
            style={styles.textInput}
            onChangeText={(text) => setEnteredText(text)}
            value={enteredText}
            numberOfLines={4}
          />
        </View>
        <View style={styles.iconRow}>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => onSubmit()}>
            <Feather name="arrow-right" size={28} color={colors.black} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => {
              setEnteredText("");
              setResultText("");
            }}>
            <Feather name="x" size={28} color={colors.black} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.resultContainer}>
        <View>
          <Text style={styles.resultText} numberOfLines={4} multiline>
            {resultText}
          </Text>
        </View>
        <View style={styles.iconRow}>
          <TouchableOpacity style={styles.iconContainer} onPress={speakText}>
            <Feather
              disabled={resultText === ""}
              name="volume-2"
              size={28}
              color={colors.white}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={copyToClipboard}>
            <Feather
              disabled={resultText === ""}
              name="copy"
              size={28}
              color={colors.white}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  languageContainer: {
    marginTop: 20,
    paddingBottom: 22,
    flexDirection: "row",
    borderColor: colors.blue,
    borderWidth: 1,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    backgroundColor: colors.blue,
  },
  languageOption: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  arrowContainer: {
    width: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  languageOptionText: {
    color: colors.white,
    letterSpacing: 0.3,
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "column",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    justifyContent: "flex-start",
    marginTop: -22,
    backgroundColor: colors.white,
    paddingBottom: 20,
  },
  textInput: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 18,
    letterSpacing: 0.3,
    marginBottom: 10,
    maxHeight: 4 * 20 * 2,
    overflow: "scroll",
  },

  iconContainer: {
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  resultContainer: {
    flexDirection: "column",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    backgroundColor: colors.blue,
    flex: 1,
    justifyContent: "flex-start",
  },

  resultText: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 18,
    letterSpacing: 0.3,
    color: colors.white,
    maxHeight: 4 * 20 * 2,
    overflow: "scroll",
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
