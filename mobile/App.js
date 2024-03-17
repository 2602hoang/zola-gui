import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChatProvider from "./providers/ChatProvider";

import { NativeBaseProvider } from "native-base";
import LoginNavigator from "./navigators/LoginNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <ChatProvider>
          <LoginNavigator />
        </ChatProvider>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
