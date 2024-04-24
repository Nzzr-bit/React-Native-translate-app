import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { FontAwesome6, Feather } from "@expo/vector-icons";
import { useCallback, useState, useEffect } from "react";
import SupportLanguages from "../utils/SupportLanguages";
import colors from "../utils/colors";

export default function HomeScreen(props) {
  const [enteredText, setEnteredText] = useState("");
  const [resultText, setResultText] = useState("");
  const [languageTo, setLanguageTo] = useState("en-GB");
  const [languageFrom, setLanguageFrom] = useState("ru-RU");
  const [timeoutId, setTimeoutId] = useState(null);
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
      });
  };

  const handleChangeText = (text) => {
    setEnteredText(text);
    clearTimeout(timeoutId);

    const id = setTimeout(() => {
      onSubmit();
    }, 500);
    setTimeoutId(id);
  };
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
        <TextInput
          multiline
          placeholder="Введите текст"
          style={styles.textInput}
          onChangeText={handleChangeText}
        />
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
    flexDirection: "row",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    marginTop: -22,
    backgroundColor: colors.white,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 15,
    letterSpacing: 0.3,
    height: 90,
    fontSize: 18,
  },
  iconContainer: {
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  resultContainer: {
    flexDirection: "row",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    backgroundColor: colors.darkBlue,
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
