import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import io from "socket.io-client";
import { MainContext } from "../context/MainContext";
import QuoteView from "./QuoteView";

const Quotes = () => {
  const {setData, EURUSD, GBPUSD, USDJPY, USDCHF, USDCAD, AUDUSD, GOLD} = useContext(MainContext);
  const [deviceWidth, setDeviceWidth] = useState(Dimensions.get('window').width - 20);


  useEffect(() => {
    let socket;

    try {
      socket = io('https://qrtm1.ifxid.com:8443');
    } catch (e) {

    }

    socket.on('connect', () => {
      socket.emit('subscribe', ['EURUSD', 'GBPUSD', 'USDJPY', 'USDCHF', 'USDCAD', 'AUDUSD', 'GOLD'])
    });

    socket.on('quotes', (data) => {
      setData(data.msg)
    });

    return () => {
      socket.on('connect', () => {
        socket.emit('unsubscribe', ['EURUSD', 'GBPUSD', 'USDJPY', 'USDCHF', 'USDCAD', 'AUDUSD', 'GOLD'])
      })
    }
  });

  useEffect(() => {
    const update = () => {
      const width = Dimensions.get('window').width - 20;
      setDeviceWidth(width);
    };

    Dimensions.addEventListener('change', update);

    return () => {
      Dimensions.removeEventListener('change', update);
    };
  });

  return (
    <View style={styles.container}>


      <View style={styles.tableName}>
        <Text style={{...styles.common, ...styles.bold, width: deviceWidth * 0.24 - 10, textAlign: 'left'}}>
          Pair
        </Text>
        <Text style={{...styles.common, ...styles.bold, width: deviceWidth * 0.25 - 10}}>
          Bid
        </Text>
        <Text style={{...styles.common, ...styles.bold, width: deviceWidth * 0.25 - 10}}>
          Change
        </Text>
        <Text style={{...styles.common, ...styles.bold, width: deviceWidth * 0.21 - 10}}>
          %
        </Text>
        <Text style={{width: deviceWidth * 0.03}}/>
      </View>
      <QuoteView currency={GOLD} deviceWidth={deviceWidth}/>
      <QuoteView currency={EURUSD} deviceWidth={deviceWidth}/>
      <QuoteView currency={GBPUSD} deviceWidth={deviceWidth}/>
      <QuoteView currency={USDJPY} deviceWidth={deviceWidth}/>
      <QuoteView currency={USDCHF} deviceWidth={deviceWidth}/>
      <QuoteView currency={USDCAD} deviceWidth={deviceWidth}/>
      <QuoteView currency={AUDUSD} deviceWidth={deviceWidth}/>
    </View>
  )
};

Quotes.propTypes = {};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 22
  },
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
  bold: {
    fontWeight: 'bold',
    fontSize: 16
  },
  arrows: {
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Quotes;