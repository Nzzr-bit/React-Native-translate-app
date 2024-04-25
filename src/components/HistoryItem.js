import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from "../utils/colors";

export default LanguageItem = (props) => {
  return (
    <View style={styles.itemsContainer}>
      <TouchableOpacity style={styles.container} onPress={props.onPress}>
        <Text style={styles.text}>{props.text}</Text>
        <View style={styles.iconContainer}>
          {props.selected && (
            <Feather name="check" size={24} color={colors.white} />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconContainer: {
    paddingRight: 7,
    width: 30,
  },
  text: {
    color: colors.white,
    letterSpacing: 0.3,
  },
});
