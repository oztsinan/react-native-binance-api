
import { } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Spot from './src/screens/Spot'
import CoinDetails from "./src/screens/CoinDetails";

const App = () => {

  const Stack = createNativeStackNavigator()

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }} >
        <Stack.Screen name="Spot" component={Spot} />
        <Stack.Screen name="CoinDetails" component={CoinDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App