import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View, YellowBox } from 'react-native';
import io from "socket.io-client";
import { RealTimeQuotesContext } from "../../context/Quotes/RealTimeQuotesContext";
import QuoteView from "./QuoteView";

const Quotes = () => {
  const {
    setData, EURUSD, GBPUSD, USDJPY, USDCHF, USDCAD, AUDUSD, GOLD,
    AUDCAD, GBPCHF, GBPCAD, USDRUR, NZDDKK, AUDHKD
  } = useContext(RealTimeQuotesContext);
  const [deviceWidth, setDeviceWidth] = useState(Dimensions.get('window').width - 20);

  YellowBox.ignoreWarnings(['Remote debugger']);

  useEffect(() => {
    let socket;

    try {
      socket = io('https://qrtm1.ifxid.com:8443', {
        forceNew: true,
      });
    } catch (e) {

    }

    socket.on('connect', () => {
      socket.emit('subscribe', ['EURUSD', 'GBPUSD', 'USDJPY', 'USDCHF', 'USDCAD', 'AUDUSD', 'GOLD',
        'AUDCAD', 'GBPCHF', 'GBPCAD', 'USDRUR', 'NZDDKK', 'AUDHKD'])
    });

    socket.on('quotes', (data) => {
      setData(data.msg)
    });

    YellowBox.ignoreWarnings([
      'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
    ]);

    return () => {
      socket.on('connect', () => {
        socket.emit('unsubscribe', ['EURUSD', 'GBPUSD', 'USDJPY', 'USDCHF', 'USDCAD', 'AUDUSD', 'GOLD',
          'AUDCAD', 'GBPCHF', 'GBPCAD', 'USDRUR', 'NZDDKK', 'AUDHKD'])
      })
    }
  }, []);

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
          <Text style={{...styles.common, ...styles.bold, width: deviceWidth * 0.24 - 10, textAlign: 'left'}}> Pair </Text>
          <Text style={{...styles.common, ...styles.bold, width: deviceWidth * 0.25 - 10}}> Bid </Text>
          <Text style={{...styles.common, ...styles.bold, width: deviceWidth * 0.25 - 10}}> Change </Text>
          <Text style={{...styles.common, ...styles.bold, width: deviceWidth * 0.21 - 10}}> % </Text>
          <Text style={{width: deviceWidth * 0.03}}/>
        </View>
      <ScrollView>
        <QuoteView currency={GOLD} deviceWidth={deviceWidth}/>
        <QuoteView currency={USDRUR} deviceWidth={deviceWidth}/>
        <QuoteView currency={EURUSD} deviceWidth={deviceWidth}/>
        <QuoteView currency={GBPUSD} deviceWidth={deviceWidth}/>
        <QuoteView currency={USDJPY} deviceWidth={deviceWidth}/>
        <QuoteView currency={USDCHF} deviceWidth={deviceWidth}/>
        <QuoteView currency={USDCAD} deviceWidth={deviceWidth}/>
        <QuoteView currency={AUDUSD} deviceWidth={deviceWidth}/>
        <QuoteView currency={AUDCAD} deviceWidth={deviceWidth}/>
        <QuoteView currency={GBPCHF} deviceWidth={deviceWidth}/>
        <QuoteView currency={GBPCAD} deviceWidth={deviceWidth}/>
        <QuoteView currency={NZDDKK} deviceWidth={deviceWidth}/>
        <QuoteView currency={AUDHKD} deviceWidth={deviceWidth}/>
      </ScrollView>
    </View>
  )
};

Quotes.propTypes = {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
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