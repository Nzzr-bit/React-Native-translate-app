import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/screens/LoginScreen";
import HistoryScreen from "./src/screens/HistoryScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./src/screens/HomeScreen";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import LanguageSelectScreen from "./src/screens/languageSelect";
import "react-native-gesture-handler";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Переводчик",
          tabBarIcon: (props) => (
            <MaterialIcons
              name="translate"
              size={props.size}
              color={props.color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Saved"
        component={HistoryScreen}
        options={{
          tabBarLabel: "Избранное",
          tabBarIcon: (props) => (
            <MaterialIcons
              name="favorite-border"
              size={props.size}
              color={props.color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <View style={{ flex: 1 }}>
        <Stack.Navigator>
          <Stack.Group>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                headerTitle: "Вход",
              }}></Stack.Screen>
          </Stack.Group>
          <Stack.Group>
            <Stack.Screen
              name="main"
              component={TabNavigator}
              options={{
                headerTitle: "",
              }}></Stack.Screen>
          </Stack.Group>
          <Stack.Group
            screenOptions={{
              presentation: "modal",
            }}>
            <Stack.Screen
              name="languageSelect"
              component={LanguageSelectScreen}></Stack.Screen>
          </Stack.Group>
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
