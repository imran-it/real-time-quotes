import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import { AntDesign } from "@expo/vector-icons";

const QuoteView = ({currency, deviceWidth}) => {
  return (
    <View style={styles.tableName}>
      <Text style={{...styles.pair, ...styles.common, width: deviceWidth * 0.24 - 10, textAlign: 'left'}}>
        {currency.symbol}
      </Text>
      <Text style={{...styles.common, width: deviceWidth * 0.25 - 10}}>
        {currency.bid}
      </Text>
      <Text style={{
        ...styles.change, ...styles.common,
        width: deviceWidth * 0.25 - 10,
        color: currency.change >= 0 ? 'green' : 'red'
      }}>
        {currency.change}
      </Text>
      <Text style={{
        ...styles.common,
        width: deviceWidth * 0.21 - 10,
        color: currency.change >= 0 ? 'green' : 'red'
      }}>
        {currency.change && (currency.change / (currency.bid / 100)).toFixed(2)}%
      </Text>
      <Text style={{...styles.arrows, width: deviceWidth * 0.03}}>
        <AntDesign name='caretup' size={10} color={currency.change >= 0 ? 'green' : 'black'}/>
        <AntDesign name='caretdown' size={10} color={currency.change < 0 ? 'red' : 'black'}/>
      </Text>
    </View>
  )
};

QuoteView.propTypes = {
  currency: PropTypes.object,
};

const styles = StyleSheet.create({
  tableName: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  common: {
    marginRight: 10,
    textAlign: 'center',
    fontSize: 15
  },
  pair: {
    fontWeight: 'bold',
  },
  arrows: {
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default QuoteView;