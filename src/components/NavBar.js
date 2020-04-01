import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Platform, View, Text } from 'react-native';
import { THEME } from './theme';

const NavBar = ({ title }) => {
  return (
    <View
      style={{
        ...styles.navbar,
        ...Platform.select({
          ios: styles.navbarIos,
          android: styles.navbarAndroid,
        }),
      }}
    >
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

NavBar.propTypes = {
  title: PropTypes.string,
};

export default NavBar;

const styles = StyleSheet.create({
  navbar: {
    width: '100%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 10,
    marginBottom: 20
  },
  navbarAndroid: {
    backgroundColor: THEME.MAIN_COLOR,
  },
  navbarIos: {
    borderBottomColor: THEME.MAIN_COLOR,
    borderBottomWidth: 1,
  },
  text: {
    color: Platform.OS === 'ios' ? THEME.MAIN_COLOR : '#fff',
    fontSize: 20,
  },
});