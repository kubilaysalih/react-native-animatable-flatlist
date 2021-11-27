import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ExampleList from './screens/ExampleList';
import routes from './routes';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="react-native-animatable-flatlist"
          component={ExampleList}
        />
        {routes.map((route) => (
          <Stack.Screen
            key={route.screenName}
            name={route.screenName}
            component={route.component}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
