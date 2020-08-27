import { Quotes } from "./Quote";

const quotes = Quotes.create();

export const store = {
  quotes,
};

window.MobxStore = store;
