import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {PaperProvider} from 'react-native-paper';
import Header from './components/Header';
import QRCodeScreen from './components/QRCode';
import {CombinedDarkTheme, CombinedDefaultTheme} from './config/Theme';
import {PreferencesContext} from './providers/PreferencesContext';
import HistoryScreen from './screens/HistoryScreen';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  const [isThemeDark, setIsThemeDark] = React.useState(false);

  let theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

  const toggleTheme = React.useCallback(() => {
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  const preferences = React.useMemo(() => ({toggleTheme, isThemeDark}), [toggleTheme, isThemeDark]);
  return (
    <PreferencesContext.Provider value={preferences}>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme}>
          <Stack.Navigator screenOptions={{header: props => <Header {...props} />}}>
            <Stack.Screen name="Root" component={QRCodeScreen} options={{headerShown: false}} />
            <Stack.Screen name="History" component={HistoryScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </PreferencesContext.Provider>
  );
}

export default App;
