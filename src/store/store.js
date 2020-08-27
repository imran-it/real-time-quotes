// import React from "react";
// import { useProvider, useCreateStore } from "mobx-store-provider";
// import Quotes from "../models/Quote";

// export const appStore = useCreateStore(() => Quotes.create());

// export const Provider = useProvider();

import { types } from "mobx-state-tree";

const AppStore = types.model({
  user: types.string,
});

export default AppStore;
