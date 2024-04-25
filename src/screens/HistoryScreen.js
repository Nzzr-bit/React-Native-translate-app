import React, { useEffect } from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";
import { useSelector } from "react-redux";
import { Feather } from "@expo/vector-icons";
import colors from "../utils/colors";

const HistoryScreen = ({ navigation }) => {
  const history = useSelector((state) => state.history.history);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "История поиска",
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      {history.length > 0 ? (
        <FlatList
          data={history}
          renderItem={({ item }) => (
            <View style={styles.historyItem}>
              <Text style={styles.text}>{item.originalText}</Text>
              <Text style={styles.textResult}>{item.translatedText}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Text style={styles.noHistoryText}>История пуста</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blue,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    marginTop: 10,
    padding: 10,
  },
  historyItem: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 20,
    color: colors.white,
    letterSpacing: 0.3,
    paddingBottom: 8,
  },
  textResult: {
    color: colors.white,
    letterSpacing: 0.3,
    fontSize: 20,
    color: colors.lightGrey,
  },

  noHistoryText: {
    color: colors.white,
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
});

export default HistoryScreen;
