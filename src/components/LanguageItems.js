import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

export default LanguageItem = (props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <View style={styles.iconContainer}>
        {props.selected && <Feather name="check" size={24} color="black" />}
      </View>

      <Text style={styles.text}>{props.text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderBottomColor: "lightGrey",
    borderBottomWidth: 1,
    flexDirection: "row",
  },
  iconContainer: {
    paddingRight: 7,
    width: 30,
  },
  text: {
    letterSpacing: 0.3,
  },
});
