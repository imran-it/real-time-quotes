export const _checkMethod = (name, _info) => {
  const found =
    _info.length === 0 ? false : _info.some((e) => e.symbol === name);

  return found;
};

export const UpdateQuery = (info) => {
  let data = {
    description: info.description,
    digits: info.digits,
    symbol: info.symbol,
    trade: info.trade,
    type: info.type,
  };

  return data;
};
