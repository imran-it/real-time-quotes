import { types, getParent, destroy, flow } from "mobx-state-tree";
import io from "socket.io-client";
import { _checkMethod, updateDataNow } from "./ExtraMethod";

export const QuotesStoreId = "QuotesStore";

export const QuetesList = types.model({
  symbol: types.string,
  bid: types.number,
  change: types.number,
  percentage: types.number,
});

export const Quotes = types
  .model({
    list: types.optional(types.array(QuetesList), []),
  })
  .actions((self) => ({
    _addQuotes(data) {
      let exists = false;
      for (let index = 0; index < self.list.length; index++) {
        if (data.symbol == self.list[index].symbol) {
          self.list.splice(index, 1, data);
          exists = true;
        }
      }
      if (!exists) {
        self.list.push(data);
      }
    },
    remove(item) {
      destroy(item);
    },
    afterCreate() {
      self._socketConnection();
    },
    _socketConnection: flow(function* () {
      let socket;

      try {
        socket = io("https://qrtm1.ifxid.com:8443", {
          forceNew: true,
        });
      } catch (e) {
        console.log("Error is here");
      }

      socket.on("connect", () => {
        socket.emit("subscribe", [
          "EURUSD",
          "GBPUSD",
          "USDJPY",
          "USDCHF",
          "USDCAD",
          "AUDUSD",
          "GOLD",
          "AUDCAD",
          "GBPCHF",
          "GBPCAD",
          "USDRUR",
          "NZDDKK",
          "AUDHKD",
        ]);
      });

      socket.on("quotes", (data) => {
        let _data = {
          symbol: data.msg.symbol,
          bid: data.msg.bid,
          change: data.msg.change,
          percentage: data.msg.change,
        };
        self._addQuotes(_data);
      });
    }),
  }))
  .views((self) => ({
    get searchList() {
      // return "nothing :) ";
      // let _data = [];
      // if (self.list.length !== 0) {
      //   self.list.map((e) => {
      //     _data.length === 0
      //       ? _data.push(e)
      //       : _checkMethod(e.symbol, _data) === false
      //       ? _data.push(e)
      //       : (_data = updateDataNow(e, _data));
      //   });
      // }
      return _data;
    },
  }));
