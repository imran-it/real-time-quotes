import React from 'react';
import { StyleSheet } from 'react-native';
import { MainState } from "./src/context/MainState";
import Quotes from "./src/components/Quotes";

export default function App() {
  // const [state, setState] = useState();
  //
  // useEffect(() => {
  //   const socket = io('https://qrtm1.ifxid.com:8443');
  //
  //   socket.on('connect', () => {
  //     socket.emit('subscribe', ['EURUSD', 'GBPUSD', 'USDJPY', 'USDCHF', 'USDCAD', 'AUDUSD', 'GOLD'])
  //   })
  //
  //   socket.on('quotes', (data) => {
  //     setState(data)
  //   })
  //
  //   return () => {
  //     socket.on('connect', () => {
  //       socket.emit('unsubscribe', ['EURUSD', 'GBPUSD', 'USDJPY', 'USDCHF', 'USDCAD', 'AUDUSD', 'GOLD'])
  //     })
  //   }
  // })

  return (
    <MainState>
      <Quotes/>
    </MainState>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
