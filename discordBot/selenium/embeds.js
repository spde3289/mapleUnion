
const setExchangeStatus = (arr, index) => {
  for (let i = index; i <= index + 6; i++) console.log(`${i} ` + arr[i]);
};

module.exports = {
  setExchangeStatus: setExchangeStatus,
};