import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Platform,
  StyleSheet,
  TextInput,
  TouchableNativeFeedback,
  TouchableOpacity,
  View
} from 'react-native';
import { PairInfoContext } from "../../context/PairInfo/PairInfoContext";
import AppText from "../custom_ui/AppText";
import AppButton from "../custom_ui/AppButton";
import { AppLoader } from "../custom_ui/AppLoader";
import Quote from "../Dashboard/Quote";
import { AntDesign } from '@expo/vector-icons';
import Colors from "../../utils/Colors";

const Dashboard = ({navigation}) => {
  const {
    fetchQuotes,
    quotes,
    quotesFiltered,
    filterQuotes,
    loading,
    error,
    paginate,
    startIndex,
    lastIndex,
    init
  } = useContext(PairInfoContext);

  const [deviceWidth, setDeviceWidth] = useState(Dimensions.get('window').width - 20);
  const [deviceHeight, setDeviceHeight] = useState(Math.round(Dimensions.get('window').height));
  const [value, onChangeText] = useState('');
  const [itemsNumber, setItemsNumber] = useState(0);
  const Wrapper = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

  const loadQuotes = useCallback(async () => {
    const height = Math.round(Dimensions.get('window').height);
    const itemsPerPage = Math.floor((height - 340) / 72)
    await init({startIndex: 0, lastIndex: itemsPerPage, itemsNumber: itemsPerPage});
    await fetchQuotes();
  }, [fetchQuotes]);

  useEffect(() => {
    const itemsPerPage = Math.floor((deviceHeight - 340) / 72)
    setItemsNumber(itemsPerPage)
  }, [])

  useEffect(() => {
    const update = () => {
      const width = Dimensions.get('window').width - 20;
      setDeviceWidth(width);
      const height = Math.round(Dimensions.get('window').height);
      setDeviceHeight(height);
      const itemsPerPage = Math.floor((height - 340) / 72)
      setItemsNumber(itemsPerPage)
      init(itemsPerPage)
    };

    Dimensions.addEventListener('change', update);

    return () => {
      Dimensions.removeEventListener('change', update);
    };
  });

  useEffect(() => {
    loadQuotes();
  }, []);

  useEffect(() => {
    if (value.length > 0) {
      filterQuotes(value)
    }
  }, [value]);

  if (loading) {
    return <AppLoader/>;
  }

  if (error) {
    return (
      <View style={styles.center}>
        <AppText style={styles.error}>{error}</AppText>
        <AppButton onPress={loadQuotes}>Try again</AppButton>
      </View>
    );
  }

  const showPairInfo = (quote) => {
    navigation.navigate('PairInfoQuotes', {quoteParams: quote, title: quote.symbol})
  };

  let content = (
    <View style={{...styles.quotes, width: deviceWidth, height: deviceHeight - 330}}>
      <FlatList
        keyExtractor={item => item.symbol}
        data={quotesFiltered}
        renderItem={({item}) => <Quote quote={item} onOpen={showPairInfo} init={init}/>}
      />
    </View>
  );

  const onChangeTextHandler = (text) => {
    onChangeText(text);
    filterQuotes(text);
  };

  const handlePaginate = (text) => {
    if (startIndex >= 0 && lastIndex < quotes.length) {
      paginate(text)
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={{...styles.input, width: deviceWidth}}
        onChangeText={text => onChangeTextHandler(text)}
        placeholder='Search.....'
        value={value}
      />
      {content}
      <View style={{...styles.pagination, ...styles.bottom, width: deviceWidth - 30}}>
        <Wrapper onPress={() => handlePaginate('prev')} activeOpacity={0.7}>
          <AntDesign name="caretleft" size={40}/>
        </Wrapper>
        <View style={{...styles.pagination, width: deviceWidth - 150}}>
          <AppText style={{fontSize: 35}}>{startIndex + 1}</AppText>
          <AppText style={{fontSize: 25}}>(from {quotes.length})</AppText>
          <AppText style={{fontSize: 35}}>{lastIndex}</AppText>
        </View>
        <Wrapper onPress={() => handlePaginate('next')} activeOpacity={0.7}>
          <AntDesign name="caretright" size={40}/>
        </Wrapper>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  quotes: {
    borderColor: 'gray', borderWidth: 1,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10
  },
  bottom: {
    marginTop: 20
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: 'gray', borderWidth: 1,
    backgroundColor: '#fff',
    borderRadius: 5,
    fontSize: 26,
    marginBottom: 10
  },
  imgWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    height: 300,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  error: {
    fontSize: 20,
    color: Colors.incorrect,
    marginBottom: 20
  },
});

export default Dashboard;