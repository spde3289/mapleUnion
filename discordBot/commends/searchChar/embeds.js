const setExchangeStatus = (arr, index) => {
  const fields = [];

  for (let i = index; i <= index + 6; i++){
    fields.push(`${i} ` + arr[i]);

  }

  return fields

};

module.exports = {
  setExchangeStatus: setExchangeStatus,
};