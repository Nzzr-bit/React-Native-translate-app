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
import colors from "./src/utils/colors";
import { Provider } from "react-redux";
import store from "./src/store/store";
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
        name="History"
        component={HistoryScreen}
        options={{
          tabBarLabel: "История",
          tabBarIcon: (props) => (
            <Feather name="clock" size={props.size} color={props.color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <View style={{ flex: 1 }}>
          <Stack.Navigator>
            <Stack.Group>
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{
                  headerTitle: "Вход",
                  eaderShadowVisible: false,
                }}></Stack.Screen>
            </Stack.Group>
            <Stack.Group>
              <Stack.Screen
                name="main"
                component={TabNavigator}
                options={{
                  headerTitle: "",
                  headerShadowVisible: false,
                  headerBackVisible: false,
                  animation: "slide_from_right",
                }}></Stack.Screen>
            </Stack.Group>
            <Stack.Group
              screenOptions={{
                presentation: "modal",
              }}>
              <Stack.Screen
                name="languageSelect"
                component={LanguageSelectScreen}
                options={{
                  headerShadowVisible: false,
                  animation: "slide_from_bottom",
                }}></Stack.Screen>
            </Stack.Group>
          </Stack.Navigator>
        </View>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
});
