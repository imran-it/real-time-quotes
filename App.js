import React, { useState } from "react";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import { RealTimeQuotesState } from "./src/context/Quotes/RealTimeQuotesState";
import Navigation from "./src/navigation/Navigation";
import PairInfoState from "./src/context/PairInfo/PairInfoState";
import { useProvider, useCreateStore } from "mobx-store-provider";

import { Quotes, QuotesStoreId } from "./src/models/Quote";
import { QuetesFilterList, StoreId } from "./src/models/Dashboard";

async function loadApp() {
  await Font.loadAsync({
    "roboto-regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "roboto-bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });
}

export default function App() {
  const [isReady, setIsReady] = useState(false);

  const appStore = useCreateStore(() => Quotes.create());

  // Get the Provider for the AppStore
  const Provider = useProvider(QuotesStoreId);

  const dashboardStore = useCreateStore(() => QuetesFilterList.create());

  const DashboardProvider = useProvider(StoreId);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadApp}
        onError={(err) => console.log(err)}
        onFinish={() => setIsReady(true)}
      />
    );
  }

  //   return (
  //     <Provider>
  //       <RealTimeQuotesState>
  //         <PairInfoState>
  //           <Navigation />
  //         </PairInfoState>
  //       </RealTimeQuotesState>
  //     </Provider>
  //   );

  return (
    <Provider value={appStore}>
      <DashboardProvider value={dashboardStore}>
        <RealTimeQuotesState>
          <PairInfoState>
            <Navigation />
          </PairInfoState>
        </RealTimeQuotesState>
      </DashboardProvider>
    </Provider>
  );
}
