import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import io from "socket.io-client";
import { MainContext } from "../context/MainContext";
import { FontAwesome, AntDesign, MaterialIcons } from '@expo/vector-icons';
const Quotes = () => {
  const [state, setState] = useState();
  const {setData, EURUSD, GBPUSD, USDJPY, USDCHF, USDCAD, AUDUSD, GOLD} = useContext(MainContext);

  useEffect(() => {
    const socket = io('https://qrtm1.ifxid.com:8443');


    socket.on('connect', () => {
      socket.emit('subscribe', ['EURUSD', 'GBPUSD', 'USDJPY', 'USDCHF', 'USDCAD', 'AUDUSD', 'GOLD'])
    });

    socket.on('quotes', (data) => {
      setState(data.msg)
      setData(data.msg)
    });

    return () => {
      socket.on('connect', () => {
        socket.emit('unsubscribe', ['EURUSD', 'GBPUSD', 'USDJPY', 'USDCHF', 'USDCAD', 'AUDUSD', 'GOLD'])
      })
    }
  }, [state, EURUSD]);

  return (
    <View style={styles.container}>
      <View style={styles.tableName}>
        <Text style={styles.pair}>
          {EURUSD.symbol}
        </Text>
        <Text style={styles.bid}>
          {EURUSD.bid}
        </Text>
        <Text style={{...styles.change, color: EURUSD.change >= 0 ? 'green' : 'red'}}>
          {EURUSD.change}
        </Text>
        <Text style={{...styles.percent, color: EURUSD.change >= 0 ? 'green' : 'red'}}>
          {(EURUSD.change / (EURUSD.bid/100)).toFixed(3)}%
        </Text>
      </View>
      <Text>{JSON.stringify(EURUSD)}</Text>
      <Text>{JSON.stringify(GBPUSD)}</Text>
      <Text>{JSON.stringify(USDJPY)}</Text>
      <Text>{JSON.stringify(USDCHF)}</Text>
      <Text>{JSON.stringify(USDCAD)}</Text>
      <Text>{JSON.stringify(AUDUSD)}</Text>
      <Text>{JSON.stringify(GOLD)}</Text>
    </View>
  )
};

Quotes.propTypes = {};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tableName: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  pair: {
    width: 60,
    fontWeight: 'bold',
    marginRight: 10
  },
  bid: {
    width: 50,
    marginRight: 10
  },
  change: {
    width: 70,
    marginRight: 10
  },
  percent: {
    width: 70,
    marginRight: 10
  },
  indicator: {
    width: 30,
  }
});

export default Quotes;