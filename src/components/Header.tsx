import React from 'react';
import {useTheme, Appbar, TouchableRipple, Switch} from 'react-native-paper';
import {PreferencesContext} from '../providers/PreferencesContext';
import {getHeaderTitle} from '@react-navigation/elements';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';

const Header = ({navigation, route, options, back}: NativeStackHeaderProps) => {
  const theme = useTheme();
  const {toggleTheme, isThemeDark} = React.useContext(PreferencesContext);
  const title = getHeaderTitle(options, route.name);

  return (
    <Appbar.Header
      theme={{
        colors: {
          primary: theme?.colors.surface,
        },
      }}>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={title} />
      {!back ? (
        <Switch color={'red'} value={isThemeDark} onValueChange={toggleTheme} />
      ) : null}
    </Appbar.Header>
  );
};

export default Header;
