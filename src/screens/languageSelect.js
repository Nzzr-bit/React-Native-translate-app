import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import SupportLanguages from "../utils/SupportLanguages";
import LanguageItems from "../components/LanguageItems";
export default function LanguageSelectScreen({ navigation, route }) {
  const params = route.params || {};
  const { title, selected } = params;
  useEffect(() => {
    navigation.setOptions({
      headerTitle: title,
    });
  }, [navigation]);

  const onLanguageSelect = useCallback(
    (itemKey) => {
      const dataKey = params.mode === "to" ? "languageTo" : "languageFrom";
      navigation.navigate("Home", { [dataKey]: itemKey });
    },
    [params, navigation]
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={Object.keys(SupportLanguages)}
        renderItem={(itemData) => {
          const languageKey = itemData.item;
          const languageString = SupportLanguages[languageKey];
          return (
            <LanguageItems
              onPress={() => onLanguageSelect(languageKey)}
              text={languageString}
              selected={languageKey === selected}
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
