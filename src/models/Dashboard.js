import { types, getParent, destroy, flow, getSnapshot } from "mobx-state-tree";

import { UpdateQuery } from "./ExtraMethod";

export const StoreId = "DashBoardStore";

const _requestApi = () => fetch(`https://quotes.instaforex.com/api/quotesList`);

export const List = types.model({
  symbol: types.string,
  description: types.string,
  trade: types.number,
  type: types.number,
  digits: types.number,
});

export const QuetesFilterList = types
  .model({
    quotes: types.optional(types.array(List), []),
    filterlist: types.optional(types.array(List), []),
    startIndex: types.optional(types.number, 0),
    lastIndex: types.optional(types.number, 4),
    itemsPerPage: types.optional(types.number, 0),
    loading: types.optional(types.boolean, false),
    error: types.optional(types.boolean, false),
  })
  .actions((self) => ({
    _APIConnection: flow(function* (indexNum) {
      try {
        const _response = yield _requestApi();
        const response = yield _response.json();

        const quotes = response.quotesList.sort((a, b) =>
          a.symbol > b.symbol ? 1 : -1
        );

        self.quotes = quotes;

        let startIndex = 0;
        let lastIndex = indexNum;
        final_result = quotes.filter(
          (quote, idx) => idx >= startIndex && idx < lastIndex
        );

        self.filterlist = final_result;
        self.startIndex = startIndex;
        self.lastIndex = lastIndex;
        self.itemsPerPage = indexNum;
      } catch (e) {
        console.log("Error is here dashboard model ", e);
      }
    }),
    filterQuotes(text) {
      try {
        let allQuotes = getSnapshot(self.quotes);
        let listAllResult = allQuotes.filter((e) =>
          e.symbol.includes(text.toUpperCase())
        );

        let filterSortResult =
          listAllResult.length >= self.itemsPerPage
            ? listAllResult.slice(0, self.itemsPerPage)
            : listAllResult;

        self.startIndex = 0;
        self.lastIndex = self.itemsPerPage;

        self.filterlist = filterSortResult;
      } catch (err) {
        console.log("ERROR is Search Model ", err);
      }
    },
    Paginate(action) {
      try {
        let data = [];
        if (action === "next") {
          let startIndex =
            self.startIndex + self.itemsPerPage > self.quotes.length
              ? self.startIndex
              : self.startIndex + self.itemsPerPage;

          let lastIndex =
            self.lastIndex + self.itemsPerPage > self.quotes.length
              ? self.quotes.length
              : self.lastIndex + self.itemsPerPage;

          let final_result = self.quotes.filter((quote, idx) =>
            idx >= startIndex && idx < lastIndex
              ? data.push(UpdateQuery(quote))
              : null
          );

          self.startIndex = startIndex;
          self.lastIndex = lastIndex;

          self.filterlist = data;
        } else {
          let startIndex =
            self.startIndex - self.itemsPerPage < 0
              ? 0
              : self.startIndex - self.itemsPerPage;

          let lastIndex =
            self.lastIndex - self.itemsPerPage < self.itemsPerPage
              ? self.itemsPerPage
              : self.lastIndex - self.itemsPerPage;

          let final_result_ = self.quotes.filter((quote, idx) =>
            idx >= startIndex && idx < lastIndex
              ? data.push(UpdateQuery(quote))
              : null
          );

          self.startIndex = startIndex;
          self.lastIndex = lastIndex;
          self.filterlist = data;
        }
      } catch (err) {
        console.log("Error is ", err);
      }
    },
  }));
