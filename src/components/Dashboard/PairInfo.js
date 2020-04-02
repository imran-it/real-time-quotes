import React, { useCallback, useContext, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { PairInfoContext } from "../../context/PairInfo/PairInfoContext";
import AppButton from "../custom_ui/AppButton";
import { AntDesign } from '@expo/vector-icons';
import AppTextBold from "../custom_ui/AppTextBold";
import AppText from "../custom_ui/AppText";
import Colors from "../../utils/Colors";

const PairInfo = ({route, navigation}) => {
  const {quoteParams} = route.params;
  const quoteId = quoteParams.symbol;
  const {quote, fetchQuote} = useContext(PairInfoContext);

  const loadQuote = useCallback(async () => {
    await fetchQuote(quoteId);
  }, [fetchQuote]);

  useEffect(() => {
    loadQuote();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.block}>
        <AppTextBold style={{fontSize: 26}}>Symbol:</AppTextBold>
        <AppText style={{fontSize: 26}}>{quoteParams['symbol']}</AppText>
      </View>
      <View style={styles.block}>
        <AppTextBold style={{fontSize: 26}}>Description:</AppTextBold>
        <AppText style={{fontSize: 26}}>{quoteParams['description']}</AppText>
      </View>
      <View style={styles.block}>
        <AppTextBold style={{fontSize: 26}}>Digits:</AppTextBold>
        <AppText style={{fontSize: 26}}>{quoteParams['digits']}</AppText>
      </View>
      <View style={styles.block}>
        <AppTextBold style={{fontSize: 26}}>Trade:</AppTextBold>
        <AppText style={{fontSize: 26}}>{quoteParams['trade']}</AppText>
      </View>
      {quote.length > 0 && (
        <View style={styles.data}>
          <View style={styles.block}>
            <AppTextBold style={{fontSize: 26}}>Ask:</AppTextBold>
            <AppText style={{fontSize: 26}}>{quote[0]['ask']}</AppText>
          </View>
          <View style={styles.block}>
            <AppTextBold style={{fontSize: 26}}>Bid:</AppTextBold>
            <AppText style={{fontSize: 26}}>{quote[0]['bid']}</AppText>
          </View>
          <View style={styles.block}>
            <AppTextBold style={{fontSize: 26}}>Change:</AppTextBold>
            <AppText style={{fontSize: 26}}>{quote[0]['change']}</AppText>
          </View>
          <View style={styles.block}>
            <AppTextBold style={{fontSize: 26}}>Change 24h:</AppTextBold>
            <AppText style={{fontSize: 26}}>{quote[0]['change24h']}</AppText>
          </View>
        </View>
      )}
      <View style={styles.button}>
        <AppButton color={Colors.greyColor} onPress={() => navigation.goBack()}>
          <AntDesign name="back" size={40}/>
        </AppButton>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20
  },
  data: {
    width: '100%',
    alignItems: 'center'
  },
  block: {
    width: '95%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  button: {
    marginTop: 50,
    width: 100
  }
});

export default PairInfo;